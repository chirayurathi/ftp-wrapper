from django.db import models

from rest_framework import serializers

class ConnectionSerializer(serializers.Serializer):
    Name = serializers.CharField()
    Organization = serializers.CharField()
    Host = serializers.CharField()
    Encryption = serializers.CharField(allow_null=True, allow_blank=True, required=False)
    Protocol = serializers.ChoiceField(choices=["SFTP"])
    Address = serializers.CharField()
    Port = serializers.IntegerField()
    LoginID = serializers.CharField()
    Password = serializers.CharField()
    TimeOut = serializers.IntegerField()
    ContactName = serializers.CharField()
    ContactEmail = serializers.EmailField()

class JobSerializer(serializers.Serializer):
    SCTASK = serializers.CharField()
    JobName = serializers.CharField()
    Inbound = serializers.ListField()
    Archive = serializers.ListField()
    Outbound = serializers.ListField()