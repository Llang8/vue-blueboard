from app import app,db
from flask import request
from models import *


@app.route('/addUser/<username>/<email>/<password>/<is_interviewer>', defaults={'first_name': None, 'last_name':None})
@app.route('/addUser/<username>/<email>/<password>/<first_name>/<last_name>/<is_interviewer>')
def addUser(username, email, password, first_name, last_name, is_interviewer):

    if is_interviewer.lower() == 'true' or is_interviewer == '1':
        is_interviewer = True
    else:
        is_interviewer = False

    user = User(username=username,email=email,first_name=first_name,last_name=last_name,is_interviewer=is_interviewer)
    user.set_password(password)

    db.session.add(user)

    try:
        db.session.commit()
        return 'Commited {}'.format(user.username)
    except Exception as e:
        db.session.rollback()
        db.session.flush() # for resetting non-commited .add()
        return 'Failed with error: {}'.format(e)    

@app.route('/delUser')
def delUser():
    user_found = False
    user = None
    print(request.args)
    try:
        username = request.args.get('username')
        user = User.query.filter_by(username=username).first()
        print(user)
        if user:
            user_found = True
            db.session.delete(user)
        
    except Exception as e:
        user_found = False
    
    if user_found == False:
        try:
            user_id = request.args.get('user_id')
            user = User.query.get(int(user_id,10))
            if user:
                user_found = True
                db.session.delete(user)

        except Exception as e:
            user_found = False

    if user_found == False:
        return 'User not found'
    else:
        db.session.commit()
        return 'Deleted user: {}'.format(user.username)
