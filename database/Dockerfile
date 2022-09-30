FROM python:3.9-slim@sha256:f0687882d40d9813c46268585403aee057a7ffe7a4a7a27b5df243201a4b01fc
COPY . /app
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
