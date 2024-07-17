# Use the .NET SDK image for build process
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY ["clientApi/clientApi.csproj", "clientApi/"]
RUN dotnet restore "clientApi/clientApi.csproj"

# Copy the rest of the application code
COPY . .

# Build the application
WORKDIR "/app/clientApi"
RUN dotnet build "clientApi.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "clientApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Set up the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "clientApi.dll"]
