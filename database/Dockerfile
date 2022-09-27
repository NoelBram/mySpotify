FROM python:3.11-rc-slim as build
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
build-essential gcc 

WORKDIR /usr/app
RUN python -m venv /usr/app/venv
ENV PATH="/usr/app/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.11-rc-slim@sha256:91a895e0c71f1cde563e612d38ec28c058291a3bd1080381ec44164098b27ddd
WORKDIR /usr/app/venv
COPY --from=build /usr/app/venv ./venv
COPY . .

ENV PATH="/usr/app/venv/bin:$PATH"
CMD [ "python", "main.py" ]