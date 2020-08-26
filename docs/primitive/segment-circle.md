## Сегмент круга

Задаётся радиусом кривизны наружной границы и радиусом касания внутренней границы.

Границы:
$$x^2+y^2=R^2;$$
$$y=a.$$

Сегментом считаем часть при $y>=a$.

Ограничим поле возможных секторов значениями $a>=0$.

Альтернативный способ задачи - через радиус и угловую длину дуги $\alpha$

$$\frac{a}{R} = \cos\frac{\alpha}{2}.$$

$$\sqrt{R^2-a^2} = R\sqrt{1-\frac{a^2}{R^2}} = R\sin\frac{\alpha}{2}$$.

### Статические моменты и центр тяжести

#### Площадь

$$F = \int_F dF;$$

$$dF = 2\sqrt{R^2-y^2} dy;$$

$$F = \int_a^R 2\sqrt{R^2-y^2} dy;$$

$$I_F = 2 \int \sqrt{R^2-y^2} dy
= \frac{y}{2}\sqrt{R^2-y^2} + \frac{R^2}{2}\arcsin\frac{y}{R} +C;
$$

$$F = I_F \bigg|_a^R 
= 2 \left( \frac{R}{2}\sqrt{R^2-R^2} + \frac{R^2}{2}\arcsin\frac{R}{R}
-\frac{a}{2}\sqrt{R^2-a^2} - \frac{R^2}{2}\arcsin\frac{a}{R} \right);$$

$$F =
R^2 \left(\frac{\pi}{2} - \arcsin\frac{a}{R} \right)
- a\sqrt{R^2-a^2};$$
$$F = R^2 \arccos\frac{a}{R}- a\sqrt{R^2-a^2}.$$
Выразим через угол
$$F = \frac{R^2\alpha}{2} - a R\sin\frac{\alpha}{2} 
= \frac{R^2\alpha}{2} - R^2\cos\frac{\alpha}{2}\sin\frac{\alpha}{2} 
= \frac{R^2\alpha}{2} - \frac{R^2\sin\alpha}{2}.$$

$$F = \frac{R^2}{2}\left(\alpha - \sin\alpha \right).$$

#### $S_x$
$$S_x = \int_F y dF;$$

$$dF = 2\sqrt{R^2-y^2} dy;$$

$$S_x = \int_a^R 2y\sqrt{R^2-y^2} dy;$$

$$I_s = \int 2y\sqrt{R^2-y^2} dy;$$

$$y = R\sin t;\ t = \arcsin\frac{y}{R};$$

$$dy = R\cos t dt;$$

$$I_s 
= 2 \int R\sin t \sqrt{R^2-R^2\sin^2 t} \cdot R\cos t dt
= 2 R^3 \int \sin t \cos^2 t dt
;$$
$$I_s = 2 R^3 \int cos^2 t d(-\cos t)
= - \frac{2 R^3 cos^3 t}{3} + C 
= -\frac{2(R^2 - y^2)^{\frac{3}{2}}}{3} + C
;$$

$$S_x  =  -\frac{2(R^2 - y^2)^{\frac{3}{2}}}{3}\bigg|_a^R
= -\frac{2(R^2 - R^2)^{\frac{3}{2}}}{3} + \frac{2(R^2 - a^2)^{\frac{3}{2}}}{3}
= \frac{2(R^2 - a^2)^{\frac{3}{2}}}{3}.$$

#### $S_y$

Ось y - является осью симметрии, значит это главная ось.

$$S_y = 0.$$

#### Центр тяжести

$$C_x = 0;$$
$$C_y = \frac{2(R^2 - a^2)^{\frac{3}{2}}}{3 F}$$

$c = 2\sqrt{R^2 - a^2}$ - длина хорды, тогда
$$C_y = \frac{c^3}{12F}.$$

### Моменты инерции

#### $J_{xx}$

$$J_{xx} = \int_F y^2 dF.$$
$$dF = 2\sqrt{R^2-y^2} dy;$$
$$J_{xx} = 2\int_a^R y^2 \sqrt{R^2-y^2} dy;$$
$$I = \int y^2 \sqrt{R^2-y^2} dy;$$
$$J_{xx} = 2 I \bigg|_a^R;$$

$$y = R\sin t;\ t = \arcsin\frac{y}{R};$$
$$dy = R\cos t dt;$$

$$I = \int \left(R\sin t\right)^2 \cdot R\sqrt{1-sin^2 t} \cdot R\cos t dt
= R^4 \int \sin^2 t \cos^2 t dt;$$

$$I_t = \int \sin^2 t \cos^2 t dt;$$

$$I = R^4 I_t.$$

$$I_t 
= \int \sin^2 t \left( 1 - \sin^2 t \right) dt
= \int \left( \sin^2 t - \sin^4 t \right) dt
= \int \sin^2 t dt - \int \sin^4 t dt;
;$$

$$I_{t,1} = \int \sin^2 t dt
= \int \frac{1-\cos 2t}{2} dt
= \frac{t}{2} - \frac{1}{2}\int \cos 2t dt
= \frac{t}{2} - \frac{1}{4}\int \cos 2t d(2t)
= \frac{t}{2} - \frac{1}{4} \sin 2t + C
;$$
$$I_{t,2} = \int \sin^4 t dt
= \int (\sin^2 t)^2 dt
= \int \left(\frac{1-\cos 2t}{2}\right)^2 dt
= \frac{1}{4}\int (1-\cos 2t)^2 dt
= \frac{1}{4}\int (1- 2 \cos 2t + \cos^2 2t) dt;
$$
$$4I_{t,2}
= t - 2 \int \cos 2t dt + \int \cos^2 2t dt
= t - \int \cos 2t d(2t) + \int \frac{1 + \cos 4t}{2} dt
= t - \sin 2t + \frac{1}{8}\int (1 + \cos 4t) d(4t)
;$$
$$4I_{t,2}
= t - \sin 2t + \frac{1}{8}4t + \frac{1}{8}\sin 4t + C
= \frac{3t}{2} - \sin 2t +  \frac{1}{8}\sin 4t + C
;$$
$$I_{t,2} = \frac{3t}{8} - \frac{\sin 2t}{4} +  \frac{\sin 4t}{32} + C;$$

$$I_t = I_{t,1} - I_{t,2} 
= \frac{t}{2} - \frac{1}{4} \sin 2t - \frac{3t}{8} + \frac{\sin 2t}{4} - \frac{\sin 4t}{32} + C
= \frac{t}{8} - \frac{\sin 4t}{32} + C;
$$

$$t = \arcsin\frac{y}{R};$$

$$\sin 4t = 2\sin 2t \cos 2t = 4 \sin t \cos t (1 - 2\sin^2 t) 
= \frac{4y}{R} \sqrt{1-\frac{y^2}{R^2}} \left(1 - \frac{2y^2}{R^2}\right);$$

$$I_t = \frac{\arcsin\frac{y}{R}}{8} -  \frac{y}{8R} \sqrt{1-\frac{y^2}{R^2}} \left(1 - \frac{2y^2}{R^2}\right) + C;$$

$$J_{xx} = 2 I \bigg|_a^R = 2 R^4 I_t \bigg|_a^R;$$

$$I_t \bigg|_a^R 
= \frac{\arcsin\frac{y}{R}}{8}\bigg|_a^R -  \frac{y}{8R} \sqrt{1-\frac{y^2}{R^2}} \left(1 - \frac{2y^2}{R^2}\right)\bigg|_a^R
= \frac{\pi}{16} - \frac{\arcsin\frac{a}{R}}{8}
- 0 + \frac{a}{8R} \sqrt{1-\frac{a^2}{R^2}} \left(1 - \frac{2a^2}{R^2}\right);
$$
$$I_t \bigg|_a^R 
= \frac{1}{8}\left(\frac{\pi}{2} - \arcsin\frac{a}{R} + \frac{a}{R} \sqrt{1-\frac{a^2}{R^2}} \left(1 - \frac{2a^2}{R^2}\right)\right)
= \frac{1}{8}\left(\arccos\frac{a}{R} + \frac{a}{R} \sqrt{1-\frac{a^2}{R^2}} \left(1 - \frac{2a^2}{R^2}\right)\right)
;$$


$$J_{xx} 
= \frac{R^4}{4}\left(\arccos\frac{a}{R} + \frac{a}{R} \sqrt{1-\frac{a^2}{R^2}} \left(1 - \frac{2a^2}{R^2}\right)\right)
;$$

Выразим через угол

$$J_{xx} 
= \frac{R^4}{4}\left(\frac{\alpha}{2} + \cos\frac{\alpha}{2} \sin\frac{\alpha}{2} \left(1 - 2\cos^2\frac{\alpha}{2}\right)\right)
= \frac{R^4}{4}\left(\frac{\alpha}{2} - \frac{\sin\alpha}{2} \left(2\cos^2\frac{\alpha}{2}-1\right)\right)
= \frac{R^4}{8}\left(\alpha - \sin\alpha\cos\alpha\right)
;$$


#### $J_{yy}$

$$J_{yy} = \int_F x^2 dF.$$

$$dF = \left( \sqrt{R^2-x^2} - a \right) dx;$$

Обозначим $b = \sqrt{R^2-a^2}$;

$$J_{yy} = \int_{-b}^b x^2 \left( \sqrt{R^2-x^2} - a \right) dx;$$

$$I = \int x^2 \left( \sqrt{R^2-x^2} - a \right) dx;$$

$$J_{yy} = I \bigg|_{-b}^b.$$

$$I = \int x^2 \sqrt{R^2-x^2} dx - a \int x^2 dx
= \int x^2 \sqrt{R^2-x^2} dx - \frac{ax^3}{3}
;$$

Заменим аналогично 
$$x=R\sin t; $$
$$\int x^2 \sqrt{R^2-x^2} dx = R^4 \int \sin^2 t \cos^2 t dt;$$

$$I_t = \int \sin^2 t \cos^2 t dt = \frac{t}{8} - \frac{\sin 4t}{32} + C;$$

$$I_t = \frac{\arcsin\frac{x}{R}}{8} -  \frac{x}{8R} \sqrt{1-\frac{x^2}{R^2}} \left(1 - \frac{2x^2}{R^2}\right) + C;$$

$$I = R^4 I_t - \frac{ax^3}{3}.$$

$$J_{yy} = I \bigg|_{-b}^b = R^4 I_t\bigg|_{-b}^b - \frac{ax^3}{3}\bigg|_{-b}^b.$$

$$\frac{ax^3}{3}\bigg|_{-b}^b = 
\frac{ab^3}{3} - \frac{a(-b)^3}{3}
= \frac{2ab^3}{3}
= \frac{2a\left(R^2-a^2\right)^{3/2}}{3}
= \frac{2aR^4\left(1-\frac{a^2}{R^2}\right)^{3/2}}{3R}
;$$

$$I_t\bigg|_{-b}^b 
= \frac{\arcsin\frac{b}{R}}{8} -  \frac{b}{8R} \sqrt{1-\frac{b^2}{R^2}} \left(1 - \frac{2b^2}{R^2}\right)
- \frac{\arcsin\frac{-b}{R}}{8} +  \frac{-b}{8R} \sqrt{1-\frac{b^2}{R^2}} \left(1 - \frac{2b^2}{R^2}\right)
= \frac{\arcsin\frac{b}{R}}{4} -  \frac{b}{4R} \sqrt{1-\frac{b^2}{R^2}} \left(1 - \frac{2b^2}{R^2}\right)
;$$

$$\frac{b^2}{R^2} = \frac{R^2-a^2}{R^2} = 1 - \frac{a^2}{R^2};$$
$$1 - \frac{b^2}{R^2} = \frac{a^2}{R^2};$$
$$\frac{b}{R} = \sqrt{1 - \frac{a^2}{R^2}} = \sqrt{1 - \cos^2 \frac{\alpha}{2}} = \sin\frac{\alpha}{2}.$$
$$\arcsin\frac{b}{R} = \frac{\alpha}{2} = \arccos\frac{a}{R}.$$

$$I_t\bigg|_{-b}^b 
= \frac{\arcsin\frac{b}{R}}{4} -  \frac{b}{4R} \sqrt{1-\frac{b^2}{R^2}} \left(1 - \frac{2b^2}{R^2}\right)
= \frac{\arccos\frac{a}{R}}{4} -  \frac{1}{4}\sqrt{1 - \frac{a^2}{R^2}} \frac{a}{R} \left(1 - 2 + 2\frac{a^2}{R^2}\right)
;$$
$$I_t\bigg|_{-b}^b 
= \frac{\arccos\frac{a}{R}}{4} -  \frac{a}{4R}\sqrt{1 - \frac{a^2}{R^2}} \left(2\frac{a^2}{R^2}-1\right)
;$$

$$J_{yy} 
= \frac{R^4\arccos\frac{a}{R}}{4} -  \frac{aR^4}{4R}\sqrt{1 - \frac{a^2}{R^2}} \left(2\frac{a^2}{R^2}-1\right)
- \frac{2aR^4\left(1-\frac{a^2}{R^2}\right)^{3/2}}{3R}
;$$

Выразим через угол
$$J_{yy} 
= \frac{R^4\alpha}{8} -  \frac{R^4}{4}\cos\frac{\alpha}{2}\sin\frac{\alpha}{2} \left(2\cos^2\frac{\alpha}{2}-1\right)
- \frac{2R^4\left(1-\cos^2\frac{\alpha}{2}\right)^{3/2}}{3}\cos\frac{\alpha}{2}
;$$
$$J_{yy} 
= \frac{R^4\alpha}{8} -  \frac{R^4}{8}\sin\alpha \cos\alpha
- \frac{2R^4\left(\sin^2\frac{\alpha}{2}\right)^{3/2}}{3}\cos\frac{\alpha}{2}
= \frac{R^4\alpha}{8} -  \frac{R^4}{8}\sin\alpha \cos\alpha
- \frac{2R^4 \sin^3\frac{\alpha}{2}}{3}\cos\frac{\alpha}{2}
;$$

$$J_{yy} 
= \frac{R^4\alpha}{8} -  \frac{R^4}{8}\sin\alpha \cos\alpha
- \frac{R^4 \sin^2\frac{\alpha}{2}\sin\alpha}{3}
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	-  \sin\alpha \cos\alpha
	- \frac{8 \sin^2\frac{\alpha}{2}\sin\alpha}{3}
\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	-  \sin\alpha \cos\alpha
	- \frac{4 (1-\cos\alpha)\sin\alpha}{3}
\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	-  \sin\alpha \cos\alpha
	- \frac{4 (\sin\alpha-\sin\alpha\cos\alpha)}{3}
\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	- \frac{4}{3} \sin\alpha  
	+ \frac{1}{3} \sin\alpha\cos\alpha
\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	- \frac{4}{3} \sin\alpha  
	+ \frac{1}{3} \sin\alpha\left(1-2\sin^2\frac{\alpha}{2}\right)
\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	- \frac{4}{3} \sin\alpha  
	+ \frac{1}{3} \sin\alpha
	-\frac{2}{3} \sin\alpha\sin^2\frac{\alpha}{2}
\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	- \sin\alpha  
	-\frac{2}{3} \sin\alpha\sin^2\frac{\alpha}{2}
\right)
.$$

Подставим обратно 

$$J_{yy} 
= \frac{R^4}{8} \left(
	2\arccos\frac{a}{R}
	- 2\frac{a}{R}\sqrt{1-\frac{a^2}{R^2}}
	-\frac{2}{3} \frac{a}{R}\left(1-\frac{a^2}{R^2}\right)^{3/2}
\right)
.$$
$$J_{yy} 
= \frac{R^4}{4} \left(
	\arccos\frac{a}{R}
	-  \frac{a}{R}\sqrt{1-\frac{a^2}{R^2}}\left(
	 1
	 +\frac{1}{3} \left(1-\frac{a^2}{R^2}\right)
	\right)
\right)
.$$
$$J_{yy} 
= \frac{R^4}{4} \left(
	\arccos\frac{a}{R}
	-  \frac{a}{3R}\sqrt{1-\frac{a^2}{R^2}}\left(
	 4
	 -\frac{a^2}{R^2}
	\right)
\right)
.$$

#### Сводка формул

$$J_{xx} 
= \frac{R^4}{4}\left(\arccos\frac{a}{R} + \frac{a}{R} \sqrt{1-\frac{a^2}{R^2}} \left(1 - \frac{2a^2}{R^2}\right)\right)
;$$

$$J_{yy} 
= \frac{R^4}{4} \left(
	\arccos\frac{a}{R}
	-  \frac{a}{3R}\sqrt{1-\frac{a^2}{R^2}}\left(
	 4
	 -\frac{a^2}{R^2}
	\right)
\right)
.$$

$$J_{xx} 
= \frac{R^4}{8}\left(\alpha - \sin\alpha\cos\alpha\right)
;$$
$$J_{yy} 
= \frac{R^4}{8} \left(
	\alpha
	- \sin\alpha  
	-\frac{2}{3} \sin\alpha\sin^2\frac{\alpha}{2}
\right)
.$$

$$J_{xy} = 0.$$

##### Центральный момент инерции

$$J_{c,yy} = J_{yy};$$
$$J_{c,xx} = J_{xx} - C_y^2F 
= J_{xx} - \left(\frac{c^3}{12F}\right)^2F
= J_{xx} - \frac{c^6}{144F};
$$
$$J_{c,xy} =0.$$