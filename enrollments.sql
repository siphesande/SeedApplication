INSERT INTO Enrollments (Numbers,enrollment_price,enrollment_date,computerLanguage_Id, school_Id)
SELECT Enrollments_csv.numbers,Enrollments_csv.cost,Enrollments_csv.date, ComputerLanguages.Id AS computerLanguage_Id, Schools.Id AS school_Id
FROM Enrollments_csv 
INNER JOIN Schools
ON Schools.School_name = Enrollments_csv.school
INNER JOIN ComputerLanguages
ON ComputerLanguages.ComputerLanguage_name = Enrollments_csv.course;
