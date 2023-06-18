import os
import cherrypy


def main(self):
    """
    Возвращает все файлы из папки js собранные в один большой мегафайл
    :param self:
    :return:
    """
    cherrypy.response.headers['Content-Type'] = 'text/javascript'

    player_script_file = ''

    cur_dir_name = './js'

    file_list = os.listdir(cur_dir_name)
    # сортировка по алфавиту
    file_list.sort()

    for item in file_list:

        if os.path.isfile(os.path.join(cur_dir_name, item)):
            with open('js/' + item, encoding="utf-8") as f:
                player_script_file += f.read() + '\n\n'

    return player_script_file
