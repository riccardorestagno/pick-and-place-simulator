# Pick and Place Simulator

## Table of Contents
- [Back-End Setup (Python)](#back-end-setup-python)
- [Front-End Setup (React)](#front-end-setup-react)
- [Functionality](#functionality)
- [Demo](#demo)

---

## Back-End Setup (Python)

### Prerequisites
- Python 3.8 or higher

### Installation Steps

1. **Clone the repository:**

   ```
   git clone https://github.com/riccardorestagno/pick-and-place-simulator.git
   cd pick-and-place-simulator/server
   ```
2. **Set up a virtual environment:**

    ```
    python -m venv env
   .\env\Scripts\activate
    ```
3. **Install dependencies:**

    ```
    pip install -r requirements.txt
    ```

4. **Run the FastAPI server:**
    ```
    uvicorn main:app --reload
    ```
   
## Front-End Setup (React)

### Prerequisites
- Node.js version 22
- npm

### Installation Steps

1. **Navigate to the front-end directory::**

   ```
   cd ../client
   ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Run the React development server:**
    ```
    npm start
    ```
4. **Access the React application:**

   The front-end will be accessible on http://localhost:3000 by default.
   
## Functionality

The pick and place simulator simulates a Robot picking up an object from Table A and placing it onto Table B. 
The initial positions of Table A, Table B and the Robot can be initialized as well as the Robots "Home" position.

### Buttons

**Initialize:** Initializes and locks all X, Y and Z coordinates for Table A, Table B, the Robots initial position and the Robots Home position in order to begin the simulation.
This button also enables the "Pick and Place" and "Move Home" action buttons.

**Reset:** Enables all X, Y and Z coordinates and disables the "Pick and Place" and "Move Home" action buttons allowing the user to reset the initial parameters of the simulation.

**Pick and Place:** Moves the Robot to Table A to pick up the object and then places the object on Table B.

**Move Home:** Moves the Robot to the previously defined Home position.

## Demo

### [Pick and Place Simulator - YouTube](https://www.youtube.com/watch?v=Qj9wv73TStY)
