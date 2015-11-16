INSERT INTO Schools (School_name)
SELECT DISTINCT school FROM Enrollments_csv; 
