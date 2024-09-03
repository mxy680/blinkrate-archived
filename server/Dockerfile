# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    make \
    curl \
    libgl1 \
    libglib2.0-0 \
    && apt-get clean

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
ENV PATH="/root/.local/bin:$PATH"

# Configure Poetry to not use virtual environments
RUN poetry config virtualenvs.create false

# Copy only the dependency files first for caching
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry install --no-root --no-dev

# Copy the rest of the application code
COPY . .

# Expose the port Flask will run on
EXPOSE 5000

# Command to run the application
CMD ["poetry", "run", "python", "src/app.py"]
