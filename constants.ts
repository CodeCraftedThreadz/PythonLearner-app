
import { Module } from './types';
import { Book, Globe, Users, Code, Video, BrainCircuit } from 'lucide-react';

export const RESOURCES_DATA = [
  {
    category: "Documentation",
    icon: Book,
    links: [
      { title: "Official Python Documentation", url: "https://docs.python.org/3/" },
      { title: "PEP 8 Style Guide", url: "https://peps.python.org/pep-0008/" },
      { title: "Real Python Tutorials", url: "https://realpython.com/" }
    ]
  },
  {
    category: "Learning Platforms",
    icon: Globe,
    links: [
      { title: "Codecademy Python", url: "https://www.codecademy.com/learn/learn-python-3" },
      { title: "Coursera Python Courses", url: "https://www.coursera.org/specializations/python" },
      { title: "edX Python Programs", url: "https://www.edx.org/learn/python" }
    ]
  },
  {
    category: "AI/ML Resources",
    icon: BrainCircuit,
    links: [
      { title: "Scikit-learn Tutorials", url: "https://scikit-learn.org/stable/tutorial/index.html" },
      { title: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
      { title: "Kaggle Learn", url: "https://www.kaggle.com/learn" }
    ]
  },
  {
    category: "Communities",
    icon: Users,
    links: [
      { title: "r/learnpython", url: "https://www.reddit.com/r/learnpython/" },
      { title: "Stack Overflow Python", url: "https://stackoverflow.com/questions/tagged/python" },
      { title: "Python Community", url: "https://www.python.org/community/" }
    ]
  },
  {
    category: "Practice",
    icon: Code,
    links: [
      { title: "LeetCode", url: "https://leetcode.com/" },
      { title: "HackerRank Python", url: "https://www.hackerrank.com/domains/python" },
      { title: "Codewars", url: "https://www.codewars.com/" }
    ]
  },
  {
    category: "Video Content",
    icon: Video,
    links: [
      { title: "Corey Schafer", url: "https://www.youtube.com/user/schafer5" },
      { title: "Sentdex", url: "https://www.youtube.com/user/sentdex" },
      { title: "Tech With Tim", url: "https://www.youtube.com/channel/UC4JX40jDee_tINbkjycV4Sg" }
    ]
  }
];

export const CURRICULUM: Module[] = [
  {
    id: 'fundamentals',
    title: 'Python Fundamentals',
    description: 'Master the building blocks of Python programming.',
    icon: 'Layout',
    lessons: [
      {
        id: 'hello-world',
        title: '1. Your First Python Program',
        difficulty: 'Beginner',
        content: `Welcome to Python! The tradition for all programmers is to start by printing "Hello, World!". 
        
In Python, we use the \`print()\` function to output text to the screen. Text needs to be wrapped in quotes (either single \`'hello'\` or double \`"hello"\`).`,
        initialCode: `# Write your code below
print("Hello, World!")`
      },
      {
        id: 'variables',
        title: '2. Variables & Storage',
        difficulty: 'Beginner',
        content: `Variables are like containers for storing data values. In Python, you don't need to declare the type.

Example:
\`\`\`python
x = 5
name = "Alice"
\`\`\`
Try creating a variable called \`message\` and printing it.`,
        initialCode: `# Create a variable and print it
message = "Python is awesome!"
print(message)`
      },
      {
        id: 'arithmetic',
        title: '3. Basic Arithmetic',
        difficulty: 'Beginner',
        content: `Python is excellent at math. You can use standard operators:
* \`+\` Addition
* \`-\` Subtraction
* \`*\` Multiplication
* \`/\` Division

Try calculating the area of a rectangle.`,
        initialCode: `length = 10
width = 5
# Calculate area
area = length * width
print(area)`
      },
      {
        id: 'strings-concat',
        title: '4. String Operations',
        difficulty: 'Beginner',
        content: `You can combine strings using \`+\` (concatenation) or using f-strings for formatting.

\`\`\`python
name = "John"
print(f"Hello, {name}")
\`\`\``,
        initialCode: `first_name = "Ada"
last_name = "Lovelace"
# Combine them to print "Ada Lovelace"
full_name = first_name + " " + last_name
print(full_name)`
      },
      {
        id: 'comparison',
        title: '5. Comparison Operators',
        difficulty: 'Beginner',
        content: `We often need to compare values. This returns a Boolean (\`True\` or \`False\`).

* \`>\` Greater than
* \`<\` Less than
* \`==\` Equal to
* \`!=\` Not equal to`,
        initialCode: `x = 10
y = 20
# Check if x is less than y
print(x < y)`
      },
      {
        id: 'control-flow',
        title: '6. If, Else & Logic',
        difficulty: 'Intermediate',
        content: `Python uses indentation to define blocks of code. 

\`if\` statements allow you to run code only if a condition is true.

\`\`\`python
age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")
\`\`\`
`,
        initialCode: `score = 85

# Write an if/else statement
if score > 50:
    print("Passed")
else:
    print("Failed")`
      },
      {
        id: 'elif-statement',
        title: '7. The Elif Statement',
        difficulty: 'Intermediate',
        content: `What if you have more than two conditions? Use \`elif\` (else if).

\`\`\`python
x = 5
if x > 10:
    print("High")
elif x > 0:
    print("Positive")
else:
    print("Negative")
\`\`\``,
        initialCode: `temperature = 25

if temperature > 30:
    print("It's hot")
elif temperature > 20:
    print("It's nice")
else:
    print("It's cold")`
      },
      {
        id: 'logical-ops',
        title: '8. Logical Operators',
        difficulty: 'Intermediate',
        content: `Combine conditions using \`and\`, \`or\`, and \`not\`.

* \`and\`: Both must be true
* \`or\`: At least one must be true
* \`not\`: Reverses the result`,
        initialCode: `is_sunny = True
have_time = True

if is_sunny and have_time:
    print("Go for a walk")`
      },
      {
        id: 'while-loops',
        title: '9. While Loops',
        difficulty: 'Intermediate',
        content: `A \`while\` loop runs as long as a condition is true.

\`\`\`python
i = 1
while i < 6:
  print(i)
  i += 1
\`\`\``,
        initialCode: `count = 5
while count > 0:
    print(count)
    count = count - 1
print("Blast off!")`
      },
      {
        id: 'for-loops',
        title: '10. For Loops',
        difficulty: 'Intermediate',
        content: `A \`for\` loop is used for iterating over a sequence. The \`range()\` function is very useful here.

\`\`\`python
for i in range(5):
    print(i) # Prints 0 to 4
\`\`\``,
        initialCode: `# Print numbers 0 to 4
for i in range(5):
    print(f"Number {i}")`
      }
    ]
  },
  {
    id: 'datatypes',
    title: 'Data Types',
    description: 'Explore Lists, Dictionaries, and more.',
    icon: 'Database',
    lessons: [
      {
        id: 'numbers',
        title: '1. Integers vs Floats',
        difficulty: 'Beginner',
        content: `Python has different number types.
* \`int\`: Whole numbers (e.g., 5)
* \`float\`: Decimal numbers (e.g., 5.0)

Dividing integers usually results in a float.`,
        initialCode: `x = 10
y = 2
print(x / y) # Result is 5.0 (float)`
      },
      {
        id: 'lists',
        title: '2. Lists (Arrays)',
        difficulty: 'Beginner',
        content: `Lists are ordered collections of items.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0]) # Access the first item
\`\`\``,
        initialCode: `colors = ["red", "green", "blue"]
# Print the second color (index 1)
print(colors[1])`
      },
      {
        id: 'list-methods',
        title: '3. List Methods',
        difficulty: 'Beginner',
        content: `Lists have built-in methods.
* \`.append(item)\`: Add to end
* \`.pop()\`: Remove from end
* \`.remove(value)\`: Remove specific item`,
        initialCode: `todo = ["Sleep", "Eat"]
todo.append("Code")
print(todo)`
      },
      {
        id: 'list-slicing',
        title: '4. List Slicing',
        difficulty: 'Intermediate',
        content: `You can access a range of items using slicing \`[start:end]\`. The end index is excluded.`,
        initialCode: `letters = ["a", "b", "c", "d", "e"]
# Get items from index 1 to 3 (b, c, d)
print(letters[1:4])`
      },
      {
        id: 'tuples',
        title: '5. Tuples',
        difficulty: 'Intermediate',
        content: `Tuples are like lists, but immutable (cannot be changed). They use parentheses \`()\`.`,
        initialCode: `coordinates = (10, 20)
print(coordinates[0])
# coordinates[0] = 5  <-- This would cause an error!`
      },
      {
        id: 'sets',
        title: '6. Sets',
        difficulty: 'Intermediate',
        content: `Sets are unordered collections with no duplicate elements. They use curly braces \`{}\`.`,
        initialCode: `unique_nums = {1, 2, 2, 3, 3, 3}
print(unique_nums) # Duplicates are removed`
      },
      {
        id: 'dicts',
        title: '7. Dictionaries',
        difficulty: 'Intermediate',
        content: `Dictionaries store data values in key:value pairs.

\`\`\`python
car = {
  "brand": "Ford",
  "model": "Mustang"
}
print(car["brand"])
\`\`\``,
        initialCode: `student = {
    "name": "Alex",
    "grade": "A"
}
# Print the student's name
print(student["name"])`
      },
      {
        id: 'dict-methods',
        title: '8. Dictionary Methods',
        difficulty: 'Advanced',
        content: `Useful dictionary methods:
* \`.keys()\`: Returns all keys
* \`.values()\`: Returns all values`,
        initialCode: `data = {"a": 1, "b": 2, "c": 3}
print(list(data.keys()))`
      },
      {
        id: 'booleans',
        title: '9. Booleans',
        difficulty: 'Beginner',
        content: `Booleans represent one of two values: \`True\` or \`False\`.`,
        initialCode: `is_python_fun = True
print(int(is_python_fun)) # True behaves like 1`
      },
      {
        id: 'type-conversion',
        title: '10. Type Conversion',
        difficulty: 'Intermediate',
        content: `You can convert between types using \`int()\`, \`str()\`, \`float()\`.`,
        initialCode: `num_str = "50"
num_int = int(num_str)
print(num_int + 50)`
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Reusable code blocks and modularity.',
    icon: 'Code',
    lessons: [
      {
        id: 'defining-functions',
        title: '1. Defining Functions',
        difficulty: 'Intermediate',
        content: `A function is a block of code which only runs when it is called.

\`\`\`python
def my_function():
  print("Hello from a function")

my_function()
\`\`\``,
        initialCode: `def greet(name):
    print(f"Hello, {name}!")

greet("Pythonista")`
      },
      {
        id: 'return-values',
        title: '2. Return Values',
        difficulty: 'Intermediate',
        content: `Functions can return data using the \`return\` statement.

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
\`\`\``,
        initialCode: `def square(number):
    return number * number

print(square(4))`
      },
      {
        id: 'parameters',
        title: '3. Multiple Parameters',
        difficulty: 'Intermediate',
        content: `Functions can accept any number of arguments, separated by commas.`,
        initialCode: `def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type} named {pet_name}.")

describe_pet("hamster", "Harry")`
      },
      {
        id: 'default-args',
        title: '4. Default Arguments',
        difficulty: 'Intermediate',
        content: `You can define a default value for a parameter. If the argument is omitted, the default is used.`,
        initialCode: `def greet(name="User"):
    print(f"Hello, {name}!")

greet()        # Uses default
greet("Alice") # Overrides default`
      },
      {
        id: 'keyword-args',
        title: '5. Keyword Arguments',
        difficulty: 'Intermediate',
        content: `You can send arguments with the \`key = value\` syntax. The order doesn't matter.`,
        initialCode: `def full_name(first, last):
    print(f"{last}, {first}")

full_name(last="Doe", first="John")`
      },
      {
        id: 'scope',
        title: '6. Scope (Local vs Global)',
        difficulty: 'Advanced',
        content: `Variables created inside a function are **local** (only exist there). Variables outside are **global**.`,
        initialCode: `x = "global"

def my_func():
    x = "local"
    print("Inside:", x)

my_func()
print("Outside:", x)`
      },
      {
        id: 'lambdas',
        title: '7. Lambda Functions',
        difficulty: 'Advanced',
        content: `A lambda is a small anonymous function. It can take any number of arguments, but can only have one expression.

Syntax: \`lambda arguments : expression\``,
        initialCode: `x = lambda a : a + 10
print(x(5))`
      },
      {
        id: 'func-in-func',
        title: '8. Functions Calling Functions',
        difficulty: 'Advanced',
        content: `Functions can call other functions. This helps break down complex tasks.`,
        initialCode: `def step_one():
    return "Step 1 Done"

def process():
    result = step_one()
    print(result + " -> Process Complete")

process()`
      },
      {
        id: 'recursion',
        title: '9. Recursion Intro',
        difficulty: 'Advanced',
        content: `Recursion is when a function calls itself. It needs a base case to stop!`,
        initialCode: `def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n-1)

countdown(3)`
      },
      {
        id: 'docstrings',
        title: '10. Docstrings',
        difficulty: 'Beginner',
        content: `Docstrings explain what a function does. They are written as the first statement in a function using triple quotes.`,
        initialCode: `def power(base, exponent):
    """Calculates base to the power of exponent"""
    return base ** exponent

print(power.__doc__)
print(power(2, 3))`
      }
    ]
  },
  {
    id: 'ai-basics',
    title: 'AI Basics',
    description: 'Introduction to Artificial Intelligence with Python.',
    icon: 'Cpu',
    lessons: [
      {
        id: 'ai-intro',
        title: '1. What is AI?',
        difficulty: 'Beginner',
        content: `Artificial Intelligence (AI) is the simulation of human intelligence processes by machines. Python is the most popular language for AI because of libraries like TensorFlow, PyTorch, and Scikit-learn.

We can't train a massive model here, but we can simulate a simple logic gate using a function, which is the basis of neural networks (Perceptrons).`,
        initialCode: `# A simple function acting as a neuron
def simple_neuron(input_val, weight):
    return input_val * weight

prediction = simple_neuron(2.0, 0.5)
print(f"Prediction: {prediction}")`
      },
      {
        id: 'numpy-concept',
        title: '2. The Concept of NumPy',
        difficulty: 'Intermediate',
        content: `In AI, we deal with lists of numbers called "Vectors". The library **NumPy** makes this fast. Here, we simulate adding two vectors manually.`,
        initialCode: `vec_a = [1, 2, 3]
vec_b = [4, 5, 6]

# Add elements index by index
result = [vec_a[i] + vec_b[i] for i in range(len(vec_a))]
print(result)`
      },
      {
        id: 'dot-product',
        title: '3. Vector Dot Product',
        difficulty: 'Advanced',
        content: `The "Dot Product" is a key operation in Neural Networks. It multiplies matching elements and sums them up.
        
\`(a[0]*b[0]) + (a[1]*b[1]) ...\``,
        initialCode: `inputs = [1.0, 2.0, 3.0]
weights = [0.2, 0.8, -0.5]

dot_product = 0
for i in range(len(inputs)):
    dot_product += inputs[i] * weights[i]

print(f"Dot Product: {dot_product}")`
      },
      {
        id: 'activation-relu',
        title: '4. Activation Function: ReLU',
        difficulty: 'Advanced',
        content: `Neurons need to decide if they should "fire". The ReLU (Rectified Linear Unit) function is very common: it turns negatives to zero.`,
        initialCode: `def relu(x):
    return max(0, x)

print(relu(-5)) # Should be 0
print(relu(10)) # Should be 10`
      },
      {
        id: 'sigmoid-math',
        title: '5. The Sigmoid Function',
        difficulty: 'Advanced',
        content: `Sigmoid squashes numbers between 0 and 1. It's often used for probabilities.
Formula: \`1 / (1 + e^-x)\``,
        initialCode: `import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

print(sigmoid(0)) # Should be 0.5`
      },
      {
        id: 'normalization',
        title: '6. Data Normalization',
        difficulty: 'Intermediate',
        content: `AI models learn better when numbers are small, usually between 0 and 1. This is called normalization.`,
        initialCode: `data = [100, 200, 300]
max_val = max(data)

# Scale data to 0-1 range
normalized = [x / max_val for x in data]
print(normalized)`
      },
      {
        id: 'classification',
        title: '7. Simple Classification',
        difficulty: 'Intermediate',
        content: `A classifier decides which group an item belongs to. Simple thresholding is a basic form of classification.`,
        initialCode: `threshold = 0.5
prediction_score = 0.85

if prediction_score > threshold:
    print("Class: Positive")
else:
    print("Class: Negative")`
      },
      {
        id: 'loss-concept',
        title: '8. Concept of Loss',
        difficulty: 'Advanced',
        content: `To "train" AI, we measure mistakes using a **Loss Function**. A simple one is Mean Absolute Error (difference between answer and prediction).`,
        initialCode: `actual = 10
predicted = 8

error = abs(actual - predicted)
print(f"Loss/Error: {error}")`
      },
      {
        id: 'simple-nlp',
        title: '9. Simple Text Processing',
        difficulty: 'Advanced',
        content: `Natural Language Processing (NLP) allows computers to understand text. A basic step is "tokenization" - splitting text into words.`,
        initialCode: `text = "AI is changing the world"
# Split the text into a list of words
tokens = text.split(" ")
print(tokens)
print(f"Word count: {len(tokens)}")`
      }
    ]
  }
];
