FROM node:22 AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM python:3.12-slim

WORKDIR /app

COPY backend/ ./backend/
COPY --from=frontend-build /frontend/build ./frontend/build
COPY frontend/src/assets ./frontend/src/assets

RUN pip install --no-cache-dir fastapi uvicorn motor authx pydantic[email] pymongo

EXPOSE 8000

CMD ["uvicorn", "backend.App.main:app", "--host", "0.0.0.0", "--port", "8000"]