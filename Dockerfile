FROM python:3.7

ARG project_dir=/app/

# ADD requirements.txt $project_dir
ADD / . $project_dir

WORKDIR $project_dir

#RUN pip install flask
RUN pip install -r requirements.txt

EXPOSE 80

CMD ["python", "main.py"]

