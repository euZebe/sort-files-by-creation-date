# files sorter by creation date

This is a Command Line Interface for sorting files according to their creation date.
Rules are:
* the file is created on a saturday or a sunday => moved to "_weekend" folder
* the file is created between 6 PM and 6 AM => moved to _evening_of_working_days
* else the file is moved to _working_hours

