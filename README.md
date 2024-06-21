# EcoMate
This is the Cloud Computing section of the Ecomate project. In this section, we focus on creating a backend api to handle the database and Machine Learning features.


## Prerequisites
- Node.js (for Express.js)
- Python 3.x (for Flask)
- npm (Node Package Manager)
- pip (Python Package Installer)
- nodemon

## Node.js installation
### 1. Install Node.js and npm
Before you start, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

### 2. Create a Project Directory

```bash
mkdir express-backend
cd express-backend
```

### 3. Initialize a New Node.js Project
```bash
npm init -y
```

### 4. Install Express.js
```bash
npm install express
```

### 5. Install Nodemon
```bash
npm install --save-dev nodemon
```

## Flask installation
### 1. Install Python
Make sure you have Python 3.x installed on your machine.

### 2. Create a Project Directory

```bash
mkdir flask-backend
cd flask-backend
```

### 3. Set Up a Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 4. Install Flask
```bash
pip install Flask
```


## API Reference

### Database API
#### Get all users

```http
  GET /users
```


#### Get user by userId

```http
  GET /:userId
```

#### Store user

```http
  POST /storeUser
```


#### Get all challenges by usedId

```http
  GET /userId/challenges
```

#### Get challenge by challengeId

```http
  GET /:userId/challenges/:challengeId
```


#### Create challenge

```http
  POST /:userId/challenges
```

#### Update challengeStatus

```http
  PUT /:userId/challenges/:challengeId/status
```

#### Add points to user

```http
  POST /:userId/addPoints
```

#### Create trash detection

```http
  POST /:userId/trashDetection
```


#### Get all trash detection data

```http
  GET /:userId/trashDetection
```

## Supporting API

#### Get challengelist

```http
  GET /api/challengeslist
```


#### Get trashbins data

```http
  GET /api/trashbins
```

#### Search trashbins data

```http
  GET /api/trashbins/search
```

## Trash Detection Model
#### Predict trash type

```http
  POST /predict
```

## Article Recommendation
#### Recommend article

```http
  POST /recommend
```


## Deployment

To deploy this project in Cloud Run, run these in Cloud Shell

```bash
  gcloud builds submit --tag gcr.io/[your-project-name]/[service-name]
```
```bash
  gcloud run deploy --image gcr.io/[your-project-name]/[service-name] --platform managed
```
