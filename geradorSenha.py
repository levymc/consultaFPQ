import hashlib

def senha(x):
    return hashlib.md5(x.encode()).hexdigest()

print(senha('processo2011'))