from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    email = Column(String(50), primary_key=True, index=True)
    user_name = Column(String(50), unique=False)
    user_pass = Column(String(20), unique=False)

    # Relationship with Note model
    notes = relationship("Note", back_populates="owner")


class Note(Base):
    __tablename__ = "notes"

    note_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String(50), unique=True)
    content = Column(String(5000), unique=False)
    user_email = Column(String(50), ForeignKey('users.email'))

    # Define the relationship with User model
    owner = relationship("User", back_populates="notes")
