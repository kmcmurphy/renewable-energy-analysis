from turtle import *
import colorsys

tracer(10)
t = [Turtle(), Turtle()]
x = 6
colors = ['#3a6a98']

for index, i in enumerate(t):
    i.speed(10) 
    i.color("white")
    i.shape("circle")
    i.shapesize(.1)
    i.width(5)
    i.pu()
    i.seth(90)
    i.fd(355)
    i.seth(-180)
    i.pd()

t[0].pu()
delay(0)
speed(10)

for i in colors:
    color(i)
    for i in range(360):
        t[0].fd(x)
        t[0].lt(1)
        pu()
        goto(t[0].pos())
        pd()
        t[1].fd(2*x)
        t[1].lt(2)
        goto(t[1].pos())

t[0].pu()
t[1].pu()
t[0].goto(-10, 10)
t[1].goto(-10, 10)
goto(t[0].pos())
goto(t[1].pos())
t[0].pd()
t[1].pd()

h=0.3
pensize(2)
bgcolor('black')

for i in range(180):
    c=colorsys.hsv_to_rgb(h,1,1)
    color(c)
    h+=0.002
    fd(20)
    circle(i-190,100)
    rt(80)
    circle(i-190,100)

    for j in range(5):
        rt(20)
        lt(20)
    lt(120)

done()
