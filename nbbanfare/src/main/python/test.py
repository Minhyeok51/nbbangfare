from os import readlink
import selenium
from selenium import webdriver as wd
import time
import pandas as pd
from bs4 import BeautifulSoup
import requests

from itertools import repeat
import re

title_list = []
src_list = []
price_list = []
start = 1
detail_list = []
url_list=['001','002','003']
        #   '020', '022','018', '004', '054', '017', '007', '008', '026', '009', '011', '006', '025', '015', '012','013','014','021' ]
category_list = []
url_number = 0


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
    
# print(title_list)
# print(src_list)
# print(price_list)
# print(detail_list)

with open('listn.txt', 'w') as f:
    for line in title_list:
        f.write(line)
        
with open('listdetail.txt', 'w') as f:
    for line in detail_list:
        f.write(line)
        
with open('category.txt', 'w') as f:
    for line in category_list:
        f.write(line)