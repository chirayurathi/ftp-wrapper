import paramiko
import pyodbc

def run_script_and_insert(data):
    jobname = data["JobName"]
    sctask = data["SCTASK"]

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect("your_azure_ip", username="your_user", password="your_password")

    # run the perl script
    stdin, stdout, stderr = ssh.exec_command(f"/perlscripts/mkscript.pl {jobname}")
    stdin.write(sctask + "\n")
    stdin.flush()
    exit_status = stdout.channel.recv_exit_status()

    if exit_status != 0:
        return {"error": f"Script failed: {stderr.read().decode()}"}

    conn = pyodbc.connect("...")  # same as before
    cursor = conn.cursor()

    for section, rows in {
        "Inbound": data["Inbound"],
        "Archive": data["Archive"],
        "Outbound": data["Outbound"]
    }.items():
        for row in rows:
            name = f"{jobname}_Arc" if section == "Archive" else jobname
            source = f"/FTP/Work/{jobname}/Archive" if section == "Archive" else f"/FTP/Work/{jobname}"
            dest = row.get("Destination", "")
            filename = row.get("Filename", "")
            query = f"""
                INSERT INTO {section if section != "Archive" else "Outbound"}
                (Name, Connection, Source, Destination, Logfile, StartTime, Frequency, Filename, Delsource, DateTime, ConnectMode, TransmitMode, NotifyError)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            cursor.execute(query, (
                name, row["Connection"], source, dest, f"/FTP/Logs/{jobname}", 
                "00:00:00.000", "Daily", filename, 
                "yes" if section != "Inbound" else "no", "", "passive", "binary", 
                "epicftpprocess@providence.org"
            ))

    conn.commit()
    return {"message": "Job submitted and SQL entries created successfully"}