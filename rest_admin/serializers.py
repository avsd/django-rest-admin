from rest_framework import serializers


class ModelAdminSerializer(serializers.Serializer):
    """Serializes instance of model with request-specific permissions."""
    name = serializers.CharField()
    object_name = serializers.CharField()  # TODO: Deprecated
    model_name = serializers.CharField()
    perms = serializers.DictField()


class AdminAppSerializer(serializers.Serializer):
    """Serializes instance of Django app (with list of models inside it)."""
    name = serializers.CharField()
    app_label = serializers.CharField()
    models = ModelAdminSerializer(many=True)
