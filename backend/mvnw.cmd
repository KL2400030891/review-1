@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements. See the NOTICE file
@REM distributed with this work for additional information regarding
@REM copyright ownership. The ASF licenses this file to you under
@REM the Apache License, Version 2.0 (the "License"); you may not
@REM use this file except in compliance with the License. You may
@REM obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied. See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.2.0
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET "MVN_CMD=mvn.cmd") ELSE (SET "MVN_CMD=%__MVNW_ARG0_NAME__%")

@SETLOCAL

@SET MAVEN_PROJECTBASEDIR=%~dp0
@SET MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%
@SET MVNW_REPOURL=https://repo.maven.apache.org/maven2

@SET MAVEN_USER_HOME=%USERPROFILE%\.m2
@SET MAVEN_DIST_DIR=%MAVEN_USER_HOME%\wrapper\dists

@SET "WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties"

@FOR /F "usebackq tokens=1,* delims==" %%A IN ("%WRAPPER_PROPERTIES%") DO (
    @IF "%%A"=="distributionUrl" SET "DISTRIBUTION_URL=%%B"
)

@IF "%DISTRIBUTION_URL%"=="" (
    ECHO "distributionUrl is not set in maven-wrapper.properties"
    EXIT /B 1
)

@REM Extract maven version from URL
@FOR %%i IN ("%DISTRIBUTION_URL%") DO SET "DISTRIB_FILENAME=%%~ni"
@SET "MAVEN_DIST_NAME=%DISTRIB_FILENAME%-bin"
@SET "MAVEN_HOME_LOCAL=%MAVEN_DIST_DIR%\%DISTRIB_FILENAME%\%MAVEN_DIST_NAME%"

@IF EXIST "%MAVEN_HOME_LOCAL%\bin\mvn.cmd" GOTO MavenFound

@REM Download Maven
@ECHO Downloading Maven from %DISTRIBUTION_URL%
@MKDIR "%MAVEN_DIST_DIR%\%DISTRIB_FILENAME%" 2>NUL
@SET "DOWNLOAD_ZIP=%MAVEN_DIST_DIR%\%DISTRIB_FILENAME%\maven.zip"
@powershell -Command "& {(New-Object System.Net.WebClient).DownloadFile('%DISTRIBUTION_URL%', '%DOWNLOAD_ZIP%')}"
@IF ERRORLEVEL 1 (
    ECHO Failed to download Maven
    EXIT /B 1
)
@powershell -Command "& {Expand-Archive -Path '%DOWNLOAD_ZIP%' -DestinationPath '%MAVEN_DIST_DIR%\%DISTRIB_FILENAME%' -Force}"
@DEL "%DOWNLOAD_ZIP%"

:MavenFound
@SET "M2_HOME=%MAVEN_HOME_LOCAL%"
@SET "PATH=%MAVEN_HOME_LOCAL%\bin;%PATH%"
@SET "JAVA_HOME_OVERRIDE=C:\Program Files\Java\jdk-21"
@IF EXIST "%JAVA_HOME_OVERRIDE%\bin\java.exe" SET "JAVA_HOME=%JAVA_HOME_OVERRIDE%"
@SET "PATH=%JAVA_HOME%\bin;%PATH%"

@"%MAVEN_HOME_LOCAL%\bin\mvn.cmd" %*
