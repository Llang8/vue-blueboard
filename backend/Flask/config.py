import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess-this'

    SQLALCHEMY_DATABASE_URI = 'postgres://Llang8:Tamemonkey12!@blueboard.cgsf4ufm4fjo.us-east-2.rds.amazonaws.com:5432/blueboard'
    SQLALCHEMY_TRACK_MODIFICATIONS = False