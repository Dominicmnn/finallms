from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("materials", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="material",
            name="file",
            field=models.FileField(blank=True, null=True, upload_to="materials/"),
        ),
    ]
