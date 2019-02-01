from graphene_django import DjangoObjectType
import graphene

from gql.models import Book, Subject, Student


class StudentType(DjangoObjectType):
    class Meta:
        model = Student


class BookType(DjangoObjectType):
    class Meta:
        model = Book


class SubjectType(DjangoObjectType):
    class Meta:
        model = Subject


class Query(graphene.ObjectType):
    students = graphene.List(StudentType)
    books = graphene.List(BookType)
    subjects = graphene.List(SubjectType)

    def resolve_students(self, info):
        return Student.objects.all()

    def resolve_books(self, info):
        return Book.objects.all()

    def resolve_subjects(self, info):
        return Subject.objects.all()


schema = graphene.Schema(query=Query)
