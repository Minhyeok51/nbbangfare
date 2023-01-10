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
<<<<<<< HEAD
=======


for i in url_list:
    # title_list.clear()
    # src_list.clear()
    # price_list.clear()    
    for j in range(1,3):
        try:
            url = 'https://www.musinsa.com/categories/item/{}?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color=&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(i,j)
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'lxml')
            soup2 = BeautifulSoup(response.text, 'lxml')
            soup3 = BeautifulSoup(response.text, 'lxml')
            
            
    
            for soup in soup.find_all('img', attrs={'class':'lazyload lazy'}):
                title_list.append(soup['alt'])
                category_list.append(i)
                src_list.append(soup['data-original']) 


            for soup in soup2.find_all('p', attrs={'class':'price'}):
                price_list.append(soup.get_text().split()[0])
            # print(i)
            # print(j)
            for soup in soup3.find_all('a', attrs={'class':'img-block'}):
                detail_list.append(soup['href'])
     
        except:
            print(start)
            break
#print(title_list)
#print(src_list)
#print(price_list)
#print(detail_list)
# for i in range(len(title_list)) :
    
#     sql = "insert into product_test values(:1, :2, :3, :4)"
#     val = (title_list[i], price_list[i], src_list[i], category_list[i])
#     cursor.execute(sql, val)
    
# with open(f, 'w', encoding='UTF-8-sig') as make_file:
#     json.dump(data)
# db.commit()

# db.close()
# all_list = [title_list, price_list, src_list, category_list]

# m1 = dict(zip(range(1,len(title_list) + 1), title_list))
# json_title = json.dumps(m1, ensure_ascii=False)
# print(json_title)
# tl = json.dumps(M)
# print(tl)

# m2 = dict(zip(range(1,len(price_list) + 1), price_list))
# json_price = json.dumps(m2, ensure_ascii=False)
# print(json_price)
    
# m3 = dict(zip(range(1,len(src_list) + 1), src_list))
# json_src = json.dumps(m3, ensure_ascii=False)
# print(json_src)
    

# m4 = dict(zip(range(1,len(category_list) + 1), category_list))
# json_category = json.dumps(m4, ensure_ascii=False) 
# print(json_category)  

# with open("title.txt","w", encoding='UTF-8-sig') as make_file:
#     json.dump(data, make_file, indent="")
    

list_all = ['productName', 'productPrice', 'productImage', 'productKind', 'productContent']

>>>>>>> branch 'develop' of https://github.com/Minhyeok51/nbbangfare.git
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

<<<<<<< HEAD
            except:
                print(start)
                break  
=======
# for i in range(len(title_list)):
#     dict_list=dict(zip('productName',title_list[i]),zip('productPrice',price_list[i])
#                    ,zip('productImage',src_list[i]),zip('productKind',category_list[i]))
                       
# for i in range(len(title_list)):
#     dic_list.append({"productName":title_list[i], "productPrice":price_list[i], "productImage":src_list[i], "productKind":category_list[i]})            
>>>>>>> branch 'develop' of https://github.com/Minhyeok51/nbbangfare.git

    fin_dic_list = list({v["productName"]:v for v in dic_list}.values())
    print(fin_dic_list)

<<<<<<< HEAD
    with open("test.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(fin_dic_list, ensure_ascii=False))
    print("ok")
=======
# with open("test.json", "w", encoding="utf-8-sig") as f:
#     f.write(json.dumps(dic_list, ensure_ascii=False))
# with open("test.json", "w", encoding="utf-8") as f:
#     f.write(json.dumps(dic_list, ensure_ascii=False))
>>>>>>> branch 'develop' of https://github.com/Minhyeok51/nbbangfare.git

schedule.every().day.at("16:18:00").do(loopJson)

while True:
    schedule.run_pending()
    time.sleep(1)