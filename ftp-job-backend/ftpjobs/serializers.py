from rest_framework import serializers

class JobSerializer(serializers.Serializer):
    SCTASK = serializers.CharField(max_length=100)
    job_name = serializers.CharField(max_length=100)

    # You could add more fields here depending on what you want to include

class ConnectionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    organization = serializers.CharField(max_length=100)
    host = serializers.CharField(max_length=255)
    encryption = serializers.CharField(max_length=100, required=False, allow_blank=True, default=None)  # Can be NULL
    protocol = serializers.CharField(max_length=50)
    address = serializers.CharField(max_length=255)
    port = serializers.IntegerField(default=22)
    login_id = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100, write_only=True)  # Never return password
    timeout = serializers.IntegerField(default=30)
    contact_name = serializers.CharField(max_length=100)
    contact_email = serializers.EmailField()

    # This will validate the fields before sending them to the DB
    def validate(self, data):
        # Example: If Encryption is set, it shouldn't be empty.
        if data.get('encryption') == "" or data.get('encryption') is None:
            data['encryption'] = None
        return data
    
class InboundSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    connection = serializers.CharField(max_length=100)
    source = serializers.CharField(max_length=255)
    destination = serializers.CharField(max_length=255)
    logfile = serializers.CharField(max_length=255)
    start_time = serializers.TimeField()
    frequency = serializers.CharField(max_length=50)
    filename = serializers.CharField(max_length=100)
    delsource = serializers.CharField(max_length=50, default='no')
    datetime = serializers.DateTimeField()
    connect_mode = serializers.CharField(max_length=50, default='passive')
    transmit_mode = serializers.CharField(max_length=50, default='binary')
    notify_error = serializers.CharField(max_length=100)

class OutboundSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    connection = serializers.CharField(max_length=100)
    source = serializers.CharField(max_length=255)
    destination = serializers.CharField(max_length=255)
    logfile = serializers.CharField(max_length=255)
    start_time = serializers.TimeField()
    frequency = serializers.CharField(max_length=50)
    filename = serializers.CharField(max_length=100)
    delsource = serializers.CharField(max_length=50, default='yes')
    datetime = serializers.DateTimeField()
    connect_mode = serializers.CharField(max_length=50, default='passive')
    transmit_mode = serializers.CharField(max_length=50, default='binary')
    notify_error = serializers.CharField(max_length=100)

class ArchiveSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    connection = serializers.CharField(max_length=100)
    source = serializers.CharField(max_length=255)
    destination = serializers.CharField(max_length=255)
    logfile = serializers.CharField(max_length=255)
    start_time = serializers.TimeField()
    frequency = serializers.CharField(max_length=50)
    filename = serializers.CharField(max_length=100)
    delsource = serializers.CharField(max_length=50, default='no')
    datetime = serializers.DateTimeField()
    connect_mode = serializers.CharField(max_length=50, default='passive')
    transmit_mode = serializers.CharField(max_length=50, default='binary')
    notify_error = serializers.CharField(max_length=100)