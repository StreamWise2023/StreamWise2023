import cv2
import face_recognition
import concurrent.futures

input_video = "sample_video.mp4"
output_video = "output_video.mp4"
image_file = "sample_image.jpeg"

image = face_recognition.load_image_file(image_file)
face_encoding = face_recognition.face_encodings(image)[0]

known_faces = [face_encoding]


def process_frame(frame):
    global found_face

    if found_face:
        return frame

    rgb_frame = frame[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_frame, model="cnn")
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    for face_encoding in face_encodings:

        match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.50)

        if match[0]:
            found_face = True
            break

    face_names = []
    for face_encoding in face_encodings:
        match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.50)
        name = None

        if match[0]:
            name = "Phani Srikant"

        face_names.append(name)

    for (top, right, bottom, left), name in zip(face_locations, face_names):
        if not name:
            continue

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        cv2.rectangle(frame, (left, bottom - 25), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)

    return frame


def process_video():
    global found_face

    input_movie = cv2.VideoCapture(input_video)
    length = int(input_movie.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = input_movie.get(cv2.CAP_PROP_FPS)
    width = int(input_movie.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(input_movie.get(cv2.CAP_PROP_FRAME_HEIGHT))
    output_movie = cv2.VideoWriter(output_video, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        frame_number = 0

        while True:
            ret, frame = input_movie.read()
            frame_number += 1

            if not ret:
                break

            future = executor.submit(process_frame, frame)
            futures.append((future, frame_number))

        for future, frame_number in futures:
            frame = future.result()
            print("Writing frame {} / {}".format(frame_number, length))
            output_movie.write(frame)

            if found_face:
                break

    input_movie.release()
    output_movie.release()
    cv2.destroyAllWindows()


found_face = False
process_video()
