from app import db
from werkzeug.security import generate_password_hash,check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25),unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True,nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    is_interviewer = db.Column(db.Boolean, default=False)
    create_date = db.Column(db.DateTime, index=True, default = datetime.utcnow)

    # Setup backrefs for one-to-many relationships
    messages = db.relationship('Message', backref='user', lazy=True)
    solutions = db.relationship('Solution', backref='user', lazy=True)
    rooms = db.relationship('Room', backref='user', lazy=True)


    def __repr__(self):
        return '<USER {}'.format(self.username)

    def set_password(self,password):
        self.password_hash = generate_password_hash(password)

    def check_password_hash(self,password):
        return check_password_hash(self.password_hash, password) 


class Prompt(db.Model):
    __tablename__ = 'prompt'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.String, nullable=False)
    editor_value = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    expected_value = db.Column(db.String, nullable=False)
    created_date = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Setup backrefs for onte to many relationships
    solutions = db.relationship('Solution', backref='prompt', lazy=True)

    def __repr__(self):
        return '<PROMPT {}'.format(self.title)

class Creator(db.Model):
    __tablename__ = 'creator'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    def __repr__(self):
        return '<CREATOR {}'.format(self.id)


class Room(db.Model):
    __tablename__ = 'room'
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('creator.id'),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    editor_value = db.Column(db.String)
    is_active = db.Column(db.Boolean, default=True)
    created_date = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Setup backrefs
    messages = db.relationship('Message', backref='room', lazy=True)

    def __repr__(self):
        return '<ROOM {}'.format(self.id)

class Solution(db.Model):
    __tablename__ = 'solution'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompt.id'), nullable=False)
    solution_value = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<SOLUTION {}'.format(self.id)

class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    
    def __repr__(self):
        return '<MESSAGE {}'.format(self.id)

class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(100))

    
    def __repr__(self):
        return '<ADMIN {}'.format(self.id)