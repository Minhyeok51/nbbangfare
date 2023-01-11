from os import readlink
import selenium
from selenium import webdriver as wd
import time
import pandas as pd
from bs4 import BeautifulSoup
import requests
import schedule
import time

from itertools import repeat

# import cx_Oracle
# import pandas as pd
import json
from collections import OrderedDict

title_list = []
src_list = []
price_list = []
start = 1
detail_list = []
url_list=['001','002','003']
        #   '020', '022','018', '004', '054', '017', '007', '008', '026', '009', '011', '006', '025', '015', '012','013','014','021' ]
category_list = []
url_number = 0
dic_list = []

def loopJson():
    for i in url_list: 
        for j in range(1,3):
            try:
                url = 'https://www.musinsa.com/categories/item/{}?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color=&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(i,j)
                response = requests.get(url)
                soup = BeautifulSoup(response.text, 'lxml')

                for soup in soup.find_all(attrs={'class':'li_inner'}):
                    try :
                        title = soup.find('a', 'img-block').select('img')[0]["alt"]
                    except:
                        title = ""
                    try:
                        href = soup.find('a', 'img-block')['href']
                    except :
                        href = ''
                    try:
                        price = soup.find('p', 'price').get_text().split()[1]
                    except:
                        price = "0"
                    try:  
                        img = soup.find('a', 'img-block').select('img')[0]['data-original']
                    except:
                        img = ""
                    dic_list.append({"productName":title, "productPrice":price, "productImage":img, "productKind":i, "productContent":href})             

            except:
                print(start)
                break       

    fin_dic_list = list({v["productName"]:v for v in dic_list}.values())
    print(fin_dic_list)


    with open("test.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(fin_dic_list, ensure_ascii=False))
    print("ok")

schedule.every().day.at("09:45:00").do(loopJson)

while True:
    schedule.run_pending()
    time.sleep(1)