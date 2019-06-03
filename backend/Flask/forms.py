from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField,PasswordField,IntegerField,BooleanField,TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError

class PromptForm(FlaskForm):
    title = StringField('Prompt Title: ', validators=[DataRequired()])
    body = TextAreaField('Prompt Body: ', validators=[DataRequired()])
    editor_value = TextAreaField('Editor Value: ')
    difficulty = IntegerField('Difficulty (1-5, 1 being the easiest): ', validators=[DataRequired()])
    expected_value = StringField('Expected value: ', validators=[DataRequired()])
    submit = SubmitField('Add Prompt')