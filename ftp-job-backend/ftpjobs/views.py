from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pyodbc
from .serializers import ConnectionSerializer, JobSerializer
from .utils import run_script_and_insert

# DB connection
def get_db_conn():
    return pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};SERVER=your_server;DATABASE=your_db;UID=username;PWD=password"
    )

@api_view(["GET", "POST"])
def connections_view(request):
    if request.method == "GET":
        conn = get_db_conn()
        cursor = conn.cursor()
        cursor.execute("SELECT Name FROM Connections")
        names = [row[0] for row in cursor.fetchall()]
        return Response(names)
    
    elif request.method == "POST":
        serializer = ConnectionSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            conn = get_db_conn()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO Connections (Name, Organization, Host, Encryption, Protocol, Address, Port, LoginID, Password, TimeOut, ContactName, ContactEmail) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                data["Name"], data["Organization"], data["Host"], 
                data.get("Encryption", None), data["Protocol"], data["Address"],
                data["Port"], data["LoginID"], data["Password"], 
                data["TimeOut"], data["ContactName"], data["ContactEmail"]
            )
            conn.commit()
            return Response({"message": "Connection saved successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def submit_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        result = run_script_and_insert(serializer.validated_data)
        return Response(result)
    return Response(serializer.errors, status=400)