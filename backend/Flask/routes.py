from app import app,db, login_manager
from flask_cors import cross_origin
from flask import request,render_template,redirect,url_for, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from models import User, Prompt, Admin, Message, Solution, Room, Creator, UserSession
from forms import PromptForm, LoginForm
from random import choice
from uuid import uuid4
import datetime

# This is a list of user session id's, this is for TESTING only
userSessions = []

@app.route('/addUser', methods=["POST"])
@cross_origin(origin="*",headers=["Content-Type","Authorization"])
def addUser():

    try:
        username = request.args.get('username')
        password = request.args.get('password')
        email = request.args.get('email')
        is_interviewer = request.args.get('is_interviewer')
    except Exception as e:
        return 'Failed with error: {}'.format(e)    

    try:
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
    except Exception as e:
        pass
    # Convert is_interviewer to boolean
    if is_interviewer.lower() == 'true' or is_interviewer == '1':
        is_interviewer = True
    else:
        is_interviewer = False

    # Set user fields and password
    user = User(username=username,email=email,first_name=first_name,last_name=last_name,is_interviewer=is_interviewer)
    user.set_password(password)

    # Add to session
    db.session.add(user)

    # Try to commit, else return error and rollback changes
    try:
        db.session.commit()
        return 'Commited {}'.format(user.username)
    except Exception as e:
        db.session.rollback()
        db.session.flush() # for resetting non-commited .add()
        return 'Failed with error: {}'.format(e)    

@app.route('/checkSession/<id>', methods=["POST","GET"])
@cross_origin(origin="*",headers=["Content-Type", "Authorization"])
def checkSession(id):
    if id == 'undefined':
        return 'Session not found'
    
    
    user_session = UserSession.query.filter_by(session_id=id).first()
    # Check that session is not expired
    if datetime.datetime.now() < user_session.expiration_date:
        user = User.query.filter_by(id=user_session.user_id).first()
        return jsonify(id=user.id,username=user.username,email=user.email,first_name=user.first_name,last_name=user.last_name,is_interviewer=user.is_interviewer,create_date=user.create_date)
    
    return 'Session not found'

# @app.route('/delUser')
# def delUser():
    
#     # Keep track of user and whether one has been found
#     user_found = False
#     user = None

#     # Try to find by username and delete
#     try:
#         username = request.args.get('username')
#         user = User.query.filter_by(username=username).first()
#         if user:
#             user_found = True
#             db.session.delete(user)
        
#     except Exception as e:
#         user_found = False
        
#     # If user wasn't found by username, try by id
#     if user_found == False:
#         try:
#             user_id = request.args.get('id')
#             user = User.query.get(int(user_id,10))
#             if user:
#                 user_found = True
#                 db.session.delete(user)

#         except Exception as e:
#             user_found = False

#     # If user found commit changes and return username else return 'user not found'
#     if user_found == False:
#         return 'User not found'
#     else:
#         db.session.commit()
#         return 'Deleted user: {}'.format(user.username)

@app.route('/login', methods=["POST"])
@cross_origin(origin="*",headers=["Content-Type","Authorization"])
def login():
    try:
        email = request.args.get('username')
        password = request.args.get('password')

        user = User.query.filter_by(email=email).first()
        if user.check_password_hash(password):
            uuid = str(uuid4())
            print(uuid)
            # Set expiration date to one week
            expiration_date = datetime.datetime.now() + datetime.timedelta(days=7)
            user_session = UserSession(session_id=uuid,user_id=user.id,expiration_date=expiration_date)
            db.session.add(user_session)
            db.session.commit()
            return jsonify(id=user.id,username=user.username,email=user.email,first_name=user.first_name,last_name=user.last_name,is_interviewer=user.is_interviewer,create_date=user.create_date, uuid=uuid)
        else:
            return 'Password Incorrect'

    except Exception as e:
        return 'Error: {}'.format(e)

@app.route('/addPrompt')
def addPrompt():
    try:
        title = request.args.get('title')
        body = request.args.get('body')
        editor_value = request.args.get('editorValue')
        difficulty = request.args.get('difficulty')
        expected_value = request.args.get('expectedValue')
        
        prompt = Prompt(title=title,body=body,editor_value=editor_value,difficulty=difficulty,expected_value=expected_value)

        db.session.add(prompt)
        db.session.commit()

        return 'Prompt {} added successfully'.format(title)

    except Exception as e:
        return 'Error {}'.format(e)

@app.route('/delPrompt')
def delPrompt():
    try:
        prompt_id = request.args.get('id')
        prompt = Prompt.query.get(int(prompt_id,10))
        db.session.delete(prompt)
        db.session.commit()
        return 'Deleted {}'.format(prompt.id)
    except Exception as e:
        return 'Error {}'.format(e)

# TODO
@app.route('/getRandomPrompt/<difficulty>')
@cross_origin(origin="*",headers=["Content-Type","Authorization"])
def randomPrompt(difficulty):
    try:
        difficulty = int(difficulty,10)
        prompts = Prompt.query.filter_by(difficulty=difficulty).all()
        prompt = choice(prompts)

        return jsonify(id=prompt.id, title=prompt.title,body=prompt.body,editor_value=prompt.editor_value,difficulty=prompt.difficulty,expected_value=prompt.expected_value, created_date=prompt.created_date)

    except Exception as e:
        return 'Error: {}'.format(e)
    
#############################################
# Below begins routes for Admin Panel
#############################################

@app.route('/adminLogin',methods=["GET","POST"])
def loginAdmin():
    if current_user.is_authenticated:
        return redirect(url_for('showPromptForm'))

    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password_hash(form.password.data):
            return redirect(url_for('loginAdmin'))

        # Check that user has admin permissions
        admin = Admin.query.filter_by(user_id=user.id).first()
        if admin is None:
            print('TEST')
            return redirect(url_for('loginAdmin'))
        
        
        login_user(admin,remember=form.remember_me.data)

        return redirect(url_for('showPromptForm'))

    return render_template('login.html',title="Sign In",form=form)

# TODO: Create login user loader when login route is created
@login_manager.user_loader
def load_user(id):
    return Admin.query.get(int(id))

@app.route('/promptForm',methods=['GET','POST'])
@login_required
def showPromptForm():
    form = PromptForm()

    if form.validate_on_submit():
        print('Form valid')
        title = form.title.data
        body = form.body.data
        editor_value = form.editor_value.data
        difficulty = form.difficulty.data
        expected_value = form.expected_value.data
        
        prompt = Prompt(title=title,body=body,editor_value=editor_value,difficulty=difficulty,expected_value=expected_value)
        db.session.add(prompt)
        db.session.commit()

    return render_template('addPrompt.html', form=form)