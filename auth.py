import casbin_sqlalchemy_adapter
import casbin
from flask import abort, redirect
from flask_login import current_user

adapter = casbin_sqlalchemy_adapter.Adapter('sqlite:///test.db')

e = casbin.Enforcer('path/to/model.conf', adapter, True)

def authenticate_admin(func):
    def authenticate_and_call(*args, **kwargs):
        if current_user is None:
            return abort, 401
        else:
            if e.enforce(current_user, obj, act):
                # permit alice to read data1casbin_sqlalchemy_adapter
                return func(*args, **kwargs)
            else:
                # deny the request, show an error
                return abort, 401

    return authenticate_and_call()




sub = "alice"  # the user that wants to access a resource.
obj = "data1"  # the resource that is going to be accessed.
act = "read"  # the operation that the user performs on the resource.