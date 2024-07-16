# Base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["clientApi/clientApi.csproj", "."]
RUN dotnet restore "clientApi.csproj"
COPY . .
WORKDIR "/src/clientApi"
RUN dotnet build "clientApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "clientApi.csproj" -c Release -o /app/publish

# Final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "clientApi.dll"]
