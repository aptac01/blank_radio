import cherrypy


class Root(object):

    @cherrypy.expose
    def index(self):

        return 'Hello World!'

    @cherrypy.expose
    def boot(self):

        return 'BOOT BOOT!!'


if __name__ == '__main__':

    cherrypy.quickstart(Root(), '/')
