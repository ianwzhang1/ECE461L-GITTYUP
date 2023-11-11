# syntax=docker/dockerfile:1

FROM python:3.11

WORKDIR .

COPY requirements.txt server/requirements.txt
RUN pip3 install -r server/requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]