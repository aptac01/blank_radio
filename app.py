import os
import cherrypy


class Root(object):

    @cherrypy.expose
    def index(self):

        with open('html/root.html', encoding="utf-8") as f:
            root_html_file = f.read()

        return root_html_file

    @cherrypy.expose
    def player_svg(self):

        with open('style/blank_radio_new.svg', encoding="utf-8") as f:
        # with open('style/blank_radio.svg', encoding="utf-8") as f:
            player_svg_file = f.read()

        return player_svg_file

    @cherrypy.expose
    def player_scripts(self):

        cherrypy.response.headers['Content-Type'] = 'text/javascript'

        player_script_file = ''

        cur_dir_name = './js'
        for item in os.listdir(cur_dir_name):

            if os.path.isfile(os.path.join(cur_dir_name, item)):

                with open('js/' + item, encoding="utf-8") as f:
                    player_script_file += f.read()

        return player_script_file

    @cherrypy.expose
    def audio(self):
        with open('audio/get_jinxed.mp3', 'rb') as f:
            audio_track_binary_content = f.read()

        return audio_track_binary_content


if __name__ == '__main__':

    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.sessions.httponly': True,
            'tools.sessions.secure': False,
            'tools.staticdir.root': os.path.abspath(os.getcwd()),
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './style'
        }
    }

    cherrypy.quickstart(Root(), '/', conf)
