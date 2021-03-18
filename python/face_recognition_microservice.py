import cv2
import numpy as np
from PIL import Image,ImageDraw
from os import listdir,remove
import pickle as pk
import math
from fastapi import FastAPI, File, Body,Form
from pydantic import BaseModel
import uvicorn
import io
import face_recognition

sift = cv2.SIFT_create(nfeatures=500)
bf = cv2.BFMatcher()
PATH="./python/features"
# PATH="./features"

def read_img_file(image_data):
    img = Image.open(io.BytesIO(image_data))
    return img

def resize_img_to_array(img):
    height,width=img.size
    if height*width>2000*2000:
        k=math.sqrt(height*width/(2000*2000))
        img=img.resize(
            (round(height/k),round(width/k)), 
            Image.ANTIALIAS
        )
    img_array = np.array(img)
    return img_array

def calculate_descr(f):
    eps=1e-7
    img=read_img_file(f)
    img=resize_img_to_array(img)
    key_points, descriptors = sift.detectAndCompute(img, None)
    descriptors /= (descriptors.sum(axis=1, keepdims=True) + eps) #RootSift
    descriptors = np.sqrt(descriptors)    #RootSift
    return (key_points,descriptors)

def match_descriptors(IMAGE_SIMILARITIES,filename,matches):
    good_matches = []
    good_matches_sum=1e-323
    for m,n in matches:
        if m.distance < 0.75*n.distance:
            good_matches.append(m)
            good_matches_sum+=m.distance
    if(len(good_matches)<5):
        return
    bestN=5
    topBestNSum=1e-323
    good_matches.sort(key=lambda match: match.distance)
    for match in good_matches[:bestN]:
        topBestNSum+=match.distance
    IMAGE_SIMILARITIES.append({"id": filename, "avg_distance": -((bestN/topBestNSum)*(len(good_matches)/(good_matches_sum)))-(len(good_matches))})

def sift_reverse_search(image):
    IMAGE_SIMILARITIES=[]
    _,target_descriptors=calculate_descr(image)
    file_names=listdir(PATH)
    for file_name in file_names:
        descs=pk.load( open(PATH+"/"+file_name, "rb"))
        if descs is None:
            continue
        matches = bf.knnMatch(target_descriptors,descs, k=2)
        match_descriptors(IMAGE_SIMILARITIES,file_name,matches)
    IMAGE_SIMILARITIES.sort(key=lambda image: image["avg_distance"])
    print(IMAGE_SIMILARITIES[:20])
    return list(map(lambda el: el["id"],IMAGE_SIMILARITIES[:20]))

app = FastAPI()
@app.get("/")
async def read_root():
    return {"Hello": "World"}

# @app.post("/sift_reverse_search")
# async def sift_reverse_search_handler(image: bytes = File(...)):
#     images=sift_reverse_search(image)
#     return images

@app.post("/test")
async def test(image: bytes = File(...)):
    image_data=read_img_file(image)
    img_np=np.array(image_data)
    print(img_np)
    face_locations = face_recognition.face_locations(img_np,model="hog")
    print(face_locations)
    for face_location in face_locations:
        # Print the location of each face in this image
        top, right, bottom, left = face_location
        print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom, right))
        # You can access the actual face itself like this:
        # face_image = img_np[top:bottom, left:right]
        draw = ImageDraw.Draw(image_data)
        draw.rectangle([left,top,right,bottom])
        image_data.show()
    return 200



# @app.post("/calculate_sift_features")
# async def calculate_sift_features_handler(image: bytes = File(...),image_id: str = Form(...)):
#     _,descs=calculate_descr(image)
#     pk.dump(descs, open(f"{PATH}/{image_id}","wb"))
#     return {"status":"200"}


# class Item(BaseModel):
#     image_id: str
# @app.post("/delete_sift_features")
# async def delete_sift_features_handler(item:Item):
#     remove(f"{PATH}/{item.image_id}")
#     return {"status":"200"}

# img=Image.open("./test.jpg").convert("RGB")
# img_np=np.array(img)
# print(img)


if __name__ == '__main__':
    uvicorn.run('face_recognition_microservice:app', host='127.0.0.1', port=55555, log_level="info")