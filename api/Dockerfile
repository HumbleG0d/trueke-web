######## CONSTRUCION DEL MAVEN ########
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build

COPY pom.xml .
RUN ls -l
RUN mvn dependency:go-offline

COPY src ./src
RUN ls -l src
RUN mvn clean package -DskipTests

######## IMAGEN PARA LA EJECUCION ########

FROM amazoncorretto:17

ARG PROFILE=dev
ARG APP_VERSION=0.0.1-SNAPSHOT

ENV DB_URL=jdbc:postgresql://db_postgres_truek:5432/truek_db
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

WORKDIR /app

## COPIAMOS EL ARCHIVO JAR GENERADO DESDE EL CONTENEDOR

COPY --from=build /build/target/api-${JAR_VERSION}.jar /app/api.jar

EXPOSE 8081 5005

CMD ["java", "-jar", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-Dspring.profiles.active=${ACTIVE_PROFILE}", "-Dspring.datasource.url=${DB_URL}", "/app/api.jar"]