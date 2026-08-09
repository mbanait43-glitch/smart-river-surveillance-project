FROM openjdk:21-jdk-slim
WORKDIR /app
COPY java-server /app/java-server
COPY frontend /app/frontend
WORKDIR /app/java-server
RUN javac com/surveillance/SmartRiverServer.java
EXPOSE 8080
CMD ["java", "-cp", ".", "com.surveillance.SmartRiverServer"]
