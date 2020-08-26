## Прямоугольный треугольник

Задан отрезками $a$ и $b$, которые отсекает гипотенуза отсекает на осях $x$ и $y$ соответственно. Прямой угол расположен в точке $O$.
Стороны треугольника
$$x =0;\; y=0;\ \frac{x}{a}+\frac{y}{b}=1.$$

$$x(y) = a - \frac{a}{b}y;$$
$$y(x) = b - \frac{b}{a}x.$$


### Статические моменты и центр масс

#### При $a>0;\;b>0$:

$$S_x = \int_F y dF = \int_0^b x(y)y dy = \int_0^b \left( ay -\frac{a}{b}y^2 \right) dy = \frac{ay^2}{2}\bigg|_0^b - \frac{ay^3}{3b}\bigg|_0^b
 = \frac{ab^2}{2} - \frac{ab^2}{3} 
 = \frac{ab^2}{6}.$$

$$S_y = \int_F x dF = \int_0^a y(x)x dx = \int_0^a \left( bx -\frac{b}{a}x^2 \right) dx = \frac{bx^2}{2}\bigg|_0^a - \frac{bx^3}{3a}\bigg|_0^a = \frac{a^2b}{6}.$$

$$F = \frac{ab}{2}.$$

$$C_x = \frac{a}{3};\; C_y = \frac{b}{3}.$$

#### При $a<0;\;b>0$:

$$S_x = \int_F y dF = \int_0^b (-x(y))y dy = - \int_0^b x(y)y dy = -\frac{ab^2}{6}.$$
$$a<0 \Rightarrow -\frac{ab^2}{6}>0.$$

$$S_y = \int_F x dF = \int_a^0 y(x) xdx = \frac{bx^2}{2}\bigg|_a^0 - \frac{bx^3}{3a}\bigg|_a^0 = 0 -\frac{ba^2}{2} + \frac{ba^2}{3} = -\frac{a^2b}{6}.$$
$$a<0 \Rightarrow -\frac{a^2b}{6}<0.$$

$$F = -\frac{ab}{2}.$$

$$C_x = \frac{a}{3};\; C_y = \frac{b}{3}.$$


#### При $a<0;\;b<0$:
$$S_x = \int_F y dF = \int_b^0 (-x(y))y dy = -\left(\frac{ay^2}{2} - \frac{ay^3}{3b}\right)\bigg|_b^0=\frac{ab^2}{6}.$$
$$S_y = \int_F x dF = \int_a^0 (-y(x))x dx = -\left(\frac{bx^2}{2} - \frac{bx^3}{3a}\right)\bigg|_a^0=\frac{a^2b}{6}.$$

$$F = \frac{ab}{2}.$$

$$C_x = \frac{a}{3};\; C_y = \frac{b}{3}.$$

#### При $a>0;\;b<0$:
$$S_x = \int_F y dF = \int_b^0 x(y)y dy = \left(\frac{ay^2}{2} - \frac{ay^3}{3b}\right)\bigg|_b^0=-\frac{ab^2}{6}.$$
$$S_y = \int_F x dF = \int_0^a (-y(x))x dx = -\left(\frac{bx^2}{2} - \frac{bx^3}{3a}\right)\bigg|_0^a=-\frac{a^2b}{6}.$$
$$F = -\frac{ab}{2}.$$

$$C_x = \frac{a}{3};\; C_y = \frac{b}{3}.$$

#### Обобщённые формулы:

$$F = \left|\frac{ab}{2}\right|.$$
$$C_x = \frac{a}{3};\; C_y = \frac{b}{3}.$$
$$S_x = FC_y;\;S_y = FC_x.$$

### Моменты инерции

#### При $a>0;\;b>0$:

$$J_{xx} = \int_F y^2 dF = 
\int_0^b x(y)y^2 dy = 
\left(\frac{ay^3}{3} - \frac{ay^4}{4b}\right)\bigg|_0^b = \frac{ab^3}{3} - \frac{ab^3}{4} = \frac{ab^3}{12}.$$

$$J_{yy} = \int_F x^2 dF = 
\int_0^a y(x)x^2 dy = 
\left(\frac{bx^3}{3} - \frac{bx^4}{4a}\right)\bigg|_0^a = \frac{a^3b}{12}.$$

$$J_{xy} = \int_F xy dF = \int_0^b dy \int_0^{x(y)} xy dx;$$
$$\int xy dx = \frac{x^2y}{2} + C;$$
$$\int_0^{x(y)} xy dx = \frac{x^2y}{2}\bigg |_0^{x(y)} = \frac{x(y)^2y}{2} = \frac{y}{2}\left(a - \frac{a}{b}y\right)^2
=\frac{a^2y}{2b^2}\left(b - y\right)^2 = \frac{a^2y}{2b^2}\left(b^2 - 2by + y^2\right);$$
$$\int_0^{x(y)} xy dx = \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right).$$

$$J_{xy} = \int_0^b \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right) dy
= \frac{a^2}{2b^2} \left(b^2 \frac{y^2}{2} - 2b\frac{y^3}{3} + \frac{y^4}{4}\right) \bigg|_0^b 
= \frac{a^2}{2b^2} \left(\frac{b^4}{2} - \frac{4b^4}{3} + \frac{b^4}{4}\right) = \frac{a^2 b^2}{24}.$$

#### При $a<0;\;b>0$:

$$J_{xx} = 
\int_F y^2 dF = \int_0^b (-x(y))y^2 dy = - \int_0^b x(y)y^2 dy = -\frac{ab^3}{12}.$$

$$J_{yy} = \int_F x^2 dF = 
\int_a^0 y(x)x^2 dy = 
\left(\frac{bx^3}{3} - \frac{bx^4}{4a}\right)\bigg|_a^0 = -\frac{a^3b}{12}.$$

$$J_{xy} = \int_F xy dF = \int_0^b dy \int_{x(y)}^0 xy dx;$$
$$\int_{x(y)}^0 xy dx = \frac{x^2y}{2}\bigg |_{x(y)}^0 = - \frac{x(y)^2y}{2} = - \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right);$$

$$J_{xy} = - \int_0^b \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right) dy = -\frac{a^2 b^2}{24}.$$


#### При $a<0;\; b<0$:
$$J_{xx} = 
\int_F y^2 dF = \int_b^0 (-x(y))y^2 dy = 
-\left(\frac{ay^3}{3} - \frac{ay^4}{4b}\right)\bigg|_b^0 = \frac{ab^3}{12}.$$

$$J_{yy} = \int_F x^2 dF = 
\int_a^0 (-y(x))x^2 dy = 
-\left(\frac{bx^3}{3} - \frac{bx^4}{4a}\right)\bigg|_a^0 = \frac{a^3b}{12}.$$

$$J_{xy} =  \int_F xy dF = \int_b^0 dy \int_{x(y)}^0 xy dx;$$

$$\int_{x(y)}^0 xy dx = - \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right);$$

$$J_{xy} =  - \int_b^0 \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right) dy
= -\frac{a^2}{2b^2} \left(b^2 \frac{y^2}{2} - 2b\frac{y^3}{3} + \frac{y^4}{4}\right) \bigg|_b^0 
= \frac{a^2 b^2}{24}
;$$

#### При $a>0;\; b<0$:
$$J_{xx} = 
\int_F y^2 dF = \int_b^0 x(y)y^2 dy = 
\left(\frac{ay^3}{3} - \frac{ay^4}{4b}\right)\bigg|_b^0 = -\frac{ab^3}{12}.$$

$$J_{yy} = \int_F x^2 dF = 
\int_0^a (-y(x))x^2 dy = 
-\left(\frac{bx^3}{3} - \frac{bx^4}{4a}\right)\bigg|_0^a = -\frac{a^3b}{12}.$$

$$J_{xy} =  \int_F xy dF = \int_b^0 dy \int_0^{x(y)} xy dx;$$
$$\int_0^{x(y)} xy dx = \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right).$$

$$J_{xy} =  \int_b^0 \frac{a^2}{2b^2}\left(b^2y - 2by^2 + y^3\right) dy
= -\frac{a^2 b^2}{24}.$$

#### Обобщённые формулы:

$$J_{xx} = \pm \frac{ab^3}{12},\,J_{yy} = \pm \frac{a^3b}{12},\,J_{xy} = \pm \frac{a^2b^2}{24};$$

$$F = \pm \frac{ab}{2};$$
причём, положения $\pm$ совпадают.

$$J_{xx} = \frac{b^2F}{6},$$
$$J_{yy} = \frac{a^2F}{6},$$
$$J_{xy} = \frac{abF}{12}.$$

##### Центральный момент инерции

$$J_{c,xx} = J_{xx} - C_y^2F  = \frac{b^2F}{6} - \left(\frac{b}{3}\right)^2F
= \frac{b^2F}{6} - \frac{b^2F}{9};$$
$$J_{c,yy} = J_{yy} - C_x^2F  = \frac{a^2F}{6} - \left(\frac{a}{3}\right)^2F
= \frac{a^2F}{6} - \frac{a^2F}{9};$$
$$J_{c,xy} = J_{xy} - C_xC_yF = \frac{abF}{12} - \frac{a}{3}\frac{b}{3}F
= \frac{abF}{12} - \frac{abF}{9};$$

$$J_{c,xx} = \frac{b^2F}{18},$$
$$J_{c,yy} = \frac{a^2F}{18},$$
$$J_{c,xy} = -\frac{abF}{36}.$$