import pandas as pd
import random


#################################################
# CONFIGURATION
#################################################

TOTAL_STUDENTS = 100

DEPARTMENTS = [
    "CSE",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL"
]

SECTIONS = ["A", "B"]

YEARS = [1, 2, 3, 4]


#################################################
# RANDOM NAME GENERATOR
#################################################

first_names = [
    "Arun","Kavin","Ravi","Anu","Priya",
    "Vignesh","Rahul","Deepak","Nisha",
    "Keerthi","Sanjay","Harini","Surya",
    "Karthik","Divya"
]

last_names = [
    "Kumar","Raj","Prasad","Mohan",
    "Devi","Lakshmi","Sharma",
    "Reddy","Babu","Narayanan"
]


#################################################
# FACULTY MASTER
#################################################

faculty = [

    {
        "FacultyID":"FAC001",
        "Name":"Mr. Alwyn Rajiv",
        "Dept":"ECE",
        "Password":"rajiv123",
        "Role":"Chairperson"
    },

    {
        "FacultyID":"FAC002",
        "Name":"Dr. Saravanan",
        "Dept":"CSE",
        "Password":"sara123",
        "Role":"Faculty"
    },

    {
        "FacultyID":"FAC003",
        "Name":"Ms. Priyanka",
        "Dept":"EEE",
        "Password":"priya123",
        "Role":"Mentor"
    },

    {
        "FacultyID":"FAC004",
        "Name":"Dr. Karthikeyan",
        "Dept":"MECH",
        "Password":"karthi123",
        "Role":"Faculty"
    },

    {
        "FacultyID":"FAC005",
        "Name":"Dr. Ramya",
        "Dept":"CIVIL",
        "Password":"ramya123",
        "Role":"Faculty"
    }

]

faculty_df = pd.DataFrame(faculty)


#################################################
# DEPARTMENT COURSE MAPPING
#################################################

DEPARTMENT_COURSES = {

    "ECE": [

        ("EC301","DSP","Signal Processing"),

        ("EC302","VLSI","VLSI"),

        ("EC303","Embedded Systems","Embedded"),

        ("EC304","Digital Communication","Communication")

    ],

    "CSE": [

        ("CS301","DBMS","Database"),

        ("CS302","AI","Artificial Intelligence"),

        ("CS303","Operating Systems","Systems"),

        ("CS304","Computer Networks","Networking")

    ],

    "EEE": [

        ("EE301","Power Systems","Electrical"),

        ("EE302","Control Systems","Automation"),

        ("EE303","Machines","Electrical"),

        ("EE304","Power Electronics","Electronics")

    ],

    "MECH": [

        ("ME301","Thermodynamics","Mechanical"),

        ("ME302","CAD","Design"),

        ("ME303","Manufacturing","Production"),

        ("ME304","Fluid Mechanics","Mechanical")

    ],

    "CIVIL": [

        ("CV301","Structural Engineering","Construction"),

        ("CV302","Surveying","Survey"),

        ("CV303","Concrete Technology","Civil"),

        ("CV304","Transportation","Infrastructure")

    ]

}


#################################################
# DEPARTMENT SKILLS
#################################################

DEPARTMENT_SKILLS = {

    "ECE": [
        "MATLAB",
        "VLSI",
        "Embedded C",
        "PCB Design"
    ],

    "CSE": [
        "Python",
        "Java",
        "Web Development",
        "Machine Learning"
    ],

    "EEE": [
        "PLC",
        "Power Systems",
        "MATLAB",
        "Electrical Design"
    ],

    "MECH": [
        "AutoCAD",
        "SolidWorks",
        "CNC",
        "Thermal Analysis"
    ],

    "CIVIL": [
        "AutoCAD",
        "STAAD Pro",
        "Surveying",
        "Structural Design"
    ]

}


#################################################
# DEPARTMENT INTERNSHIP DOMAINS
#################################################

INTERNSHIP_COMPANIES = {

    "ECE": [
        ("Intel","VLSI"),
        ("Qualcomm","Embedded Systems")
    ],

    "CSE": [
        ("Google","AI"),
        ("Infosys","Web Development")
    ],

    "EEE": [
        ("ABB","Electrical"),
        ("Siemens","Automation")
    ],

    "MECH": [
        ("Ashok Leyland","Manufacturing"),
        ("Hyundai","Design")
    ],

    "CIVIL": [
        ("L&T","Construction"),
        ("UltraTech","Infrastructure")
    ]

}


#################################################
# STUDENT MASTER
#################################################

students = []

faculty_ids = [
    "FAC001",
    "FAC002",
    "FAC003",
    "FAC004",
    "FAC005"
]

genders = ["Male", "Female"]

for i in range(1, TOTAL_STUDENTS + 1):

    dept = random.choice(DEPARTMENTS)

    year = random.choice(YEARS)

    section = random.choice(SECTIONS)

    gender = random.choice(genders)

    roll = f"21{dept}{i:03}"

    first = random.choice(first_names)

    last = random.choice(last_names)

    name = first + " " + last

    email = first.lower() + str(i) + "@gmail.com"

    students.append({

        "RollNo" : roll,

        "Name" : name,

        "Dept" : dept,

        "Year" : year,

        "Section" : section,

        "Gender" : gender,

        "DOB" :
            f"2005-{random.randint(1,12):02}-{random.randint(1,28):02}",

        "FacultyID" :
            random.choice(faculty_ids),

        "Tenth" :
            round(random.uniform(70,99),1),

        "Twelfth" :
            round(random.uniform(70,99),1),

        "Email" :
            email,

        "Mobile" :
            random.randint(9000000000,9999999999),

        "Password" :
            first.lower() + "123"

    })

student_df = pd.DataFrame(students)


#################################################
# SEMESTER CGPA
#################################################

cgpa_rows = []

for student in students:

    row = {

        "RollNo":
            student["RollNo"]

    }

    for sem in range(1,9):

        row[f"Sem{sem}"] = round(

            random.uniform(6.5,9.8),

            2

        )

    cgpa_rows.append(row)

cgpa_df = pd.DataFrame(cgpa_rows)


#################################################
# COURSE INTERNALS
#################################################

internal_rows = []

for student in students:

    semester = student["Year"] + 2

    dept_courses = DEPARTMENT_COURSES[
        student["Dept"]
    ]

    for course in dept_courses:

        internal_rows.append({

            "RollNo" :
                student["RollNo"],

            "Semester" :
                semester,

            "CourseCode" :
                course[0],

            "CourseName" :
                course[1],

            "Cycle1" :
                random.randint(60,100),

            "Cycle2" :
                random.randint(60,100),

            "Assignment" :
                random.randint(60,100),

            "Model" :
                random.randint(60,100),

            "Lab" :
                random.randint(60,100)

        })

internal_df = pd.DataFrame(internal_rows)


#################################################
# COURSE END SEM
#################################################

grades = [
    "O",
    "A+",
    "A",
    "B+",
    "B"
]

endsem_rows = []

for student in students:

    semester = student["Year"] + 2

    dept_courses = DEPARTMENT_COURSES[
        student["Dept"]
    ]

    for course in dept_courses:

        endsem_rows.append({

            "RollNo" :
                student["RollNo"],

            "Semester" :
                semester,

            "CourseCode" :
                course[0],

            "CourseName" :
                course[1],

            "EndSemGrade" :
                random.choice(grades)

        })

endsem_df = pd.DataFrame(endsem_rows)


#################################################
# APTITUDE
#################################################

aptitude_rows = []

for student in students:

    for test in range(1,6):

        aptitude_rows.append({

            "RollNo" :
                student["RollNo"],

            "TestName" :
                f"Aptitude Test {test}",

            "Score" :
                random.randint(50,100)

        })

aptitude_df = pd.DataFrame(aptitude_rows)


#################################################
# TECHNICAL SKILLS
#################################################

technical_rows = []

for student in students:

    skills = DEPARTMENT_SKILLS[
        student["Dept"]
    ]

    for skill in skills:

        technical_rows.append({

            "RollNo" :
                student["RollNo"],

            "Skill" :
                skill,

            "Level" :
                random.randint(50,100)

        })

technical_df = pd.DataFrame(technical_rows)


#################################################
# INTERNSHIP
#################################################

internship_rows = []

for student in students:

    company = random.choice(

        INTERNSHIP_COMPANIES[
            student["Dept"]
        ]

    )

    internship_rows.append({

        "RollNo" :
            student["RollNo"],

        "Company" :
            company[0],

        "Domain" :
            company[1],

        "DurationMonths" :
            random.randint(1,6),

        "FeedbackScore" :
            random.randint(60,100)

    })

internship_df = pd.DataFrame(internship_rows)


#################################################
# SOFT SKILLS
#################################################

soft_rows = []

for student in students:

    soft_rows.append({

        "RollNo" :
            student["RollNo"],

        "Communication" :
            random.randint(50,100),

        "Leadership" :
            random.randint(50,100),

        "Teamwork" :
            random.randint(50,100),

        "Professionalism" :
            random.randint(50,100)

    })

soft_df = pd.DataFrame(soft_rows)


#################################################
# ATTENDANCE
#################################################

attendance_rows = []

for student in students:

    attendance_rows.append({

        "RollNo" :
            student["RollNo"],

        "Percentage" :
            random.randint(65,100)

    })

attendance_df = pd.DataFrame(attendance_rows)


#################################################
# ENGAGEMENT
#################################################

engagement_rows = []

for student in students:

    engagement_rows.append({

        "RollNo" :
            student["RollNo"],

        "Hackathon" :
            random.randint(0,100),

        "Paper" :
            random.randint(0,100),

        "Club" :
            random.randint(0,100),

        "Volunteer" :
            random.randint(0,100)

    })

engagement_df = pd.DataFrame(engagement_rows)


#################################################
# COURSE DOMAIN MAP
#################################################

domain_rows = []

for dept in DEPARTMENT_COURSES:

    for course in DEPARTMENT_COURSES[dept]:

        domain_rows.append({

            "CourseCode" :
                course[0],

            "CourseName" :
                course[1],

            "Domain" :
                course[2]

        })

domain_df = pd.DataFrame(domain_rows)


#################################################
# PLACEMENT DATA
#################################################

placement_rows = []

for student in students:

    placement_rows.append({

        "RollNo" :
            student["RollNo"],

        "MockInterview" :
            random.randint(40,100),

        "CodingScore" :
            random.randint(40,100),

        "ResumeScore" :
            random.randint(40,100),

        "PlacementStatus" :
            random.choice([
                "Placed",
                "Not Placed"
            ])

    })

placement_df = pd.DataFrame(placement_rows)


#################################################
# CATEGORY CONFIG
#################################################

category_df = pd.DataFrame([

    {
        "CategoryName":"Academic",
        "Weight":0.25,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Background",
        "Weight":0.10,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Domain",
        "Weight":0.10,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Aptitude",
        "Weight":0.15,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Technical",
        "Weight":0.10,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Internship",
        "Weight":0.10,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"SoftSkill",
        "Weight":0.10,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Attendance",
        "Weight":0.05,
        "Enabled":"Yes"
    },

    {
        "CategoryName":"Engagement",
        "Weight":0.05,
        "Enabled":"Yes"
    }

])


#################################################
# SAVE CSV FILES
#################################################

student_df.to_csv(
    "STUDENT_MASTER.csv",
    index=False
)

faculty_df.to_csv(
    "FACULTY_MASTER.csv",
    index=False
)

cgpa_df.to_csv(
    "SEMESTER_CGPA.csv",
    index=False
)

internal_df.to_csv(
    "COURSE_INTERNALS.csv",
    index=False
)

endsem_df.to_csv(
    "COURSE_ENDSEM.csv",
    index=False
)

aptitude_df.to_csv(
    "APTITUDE.csv",
    index=False
)

technical_df.to_csv(
    "TECHNICAL_SKILLS.csv",
    index=False
)

internship_df.to_csv(
    "INTERNSHIP.csv",
    index=False
)

soft_df.to_csv(
    "SOFT_SKILLS.csv",
    index=False
)

attendance_df.to_csv(
    "ATTENDANCE.csv",
    index=False
)

engagement_df.to_csv(
    "ENGAGEMENT.csv",
    index=False
)

category_df.to_csv(
    "CATEGORY_CONFIG.csv",
    index=False
)

domain_df.to_csv(
    "COURSE_DOMAIN_MAP.csv",
    index=False
)

placement_df.to_csv(
    "PLACEMENT_DATA.csv",
    index=False
)


#################################################
# FINAL MESSAGE
#################################################

print("✅ ALL DATASETS GENERATED SUCCESSFULLY")