# Тензор момента

## Определения
Момент инерции относительно оси $e$.
$$J_e = \int \rho^2 dm$$

Тензор инерции
$$J = \int \hat{r}^T \hat{r} dm.$$

## Геометрический момент и тензор инерции сечения

Полагаем, что плотность однородна и равна единице.\\
Полагаем, что сечение плоское, две оси выбираются в его плоскости, а третья - перпендикулярна ей.\\
Поэтому в формулах геометрических моментов вместо массы фигурирует площадь.

### Матрица преобразования

Пусть $\vec{r} = x\vec{i}+y\vec{j}$, $\vec{\omega} = p\vec{i}+q\vec{j}$.

$$\vec{\omega} \times \vec{r} = \hat{r}\vec{\omega}.$$

$$\left|
\begin{matrix}
	\vec{i} & \vec{j} 	& \vec{k} 	\\
	x 		& y 		& 0 		\\
	a 		& b 		& c
\end{matrix}
\right|
= 
\vec{i}yc +xb\vec{k} - ay\vec{k} - xc\vec{j}
=
\left(
\begin{matrix}
	cy \\
	-cx \\
	-ay + bx
\end{matrix}
\right)
$$

$$
\left(
\begin{matrix}
	r_{00} && r_{01} && r_{02} \\
	r_{10} && r_{11} && r_{12} \\
	r_{20} && r_{21} && r_{22}
\end{matrix}
\right)
\left(
\begin{matrix}
	a \\
	b \\
	c
\end{matrix}
\right)
=
\left(
\begin{matrix}
	ar_{00} + br_{01} + cr_{02} \\
	ar_{10} + br_{11} + cr_{12} \\
	ar_{20} + br_{21} + cr_{22}
\end{matrix}
\right)
$$

$$\hat{r} = 
\left(
\begin{matrix}
	0 & 0 & y \\
	0 & 0 & -x \\
	-y & x & 0
\end{matrix}
\right)
$$

$$\hat{r}^T \hat{r} =
\left(
\begin{matrix}
	0 & 0 & -y \\
	0 & 0 & x \\
	y & -x & 0
\end{matrix}
\right)
\left(
\begin{matrix}
	0 & 0 & y \\
	0 & 0 & -x \\
	-y & x & 0
\end{matrix}
\right)
=
\left(
\begin{matrix}
	y^2 & -xy & 0 \\
	-xy & x^2 & 0 \\
	0 & 0 & y^2+x^2
\end{matrix}
\right)

$$
### Элементы тензора инерции сечения
$$J = \int_F \hat{r}^T \hat{r} dF;$$

$$J = 
\left(
\begin{matrix}
	J_{xx} & -J_{xy} & 0 \\
	-J_{xy} & J_{yy} & 0 \\
	0 & 0 & J_{\rho}
\end{matrix}
\right)
$$

### Преобразование тензора инерции при сдвиге координат

Пусть $C$ - центр тяжести сечения, $A = \{a, b, 0\}$ - координаты новой точки отсчёта относительно центра тяжести.
$J_C$ - тензор инерции, относительно центральных осей, параллельных заданным.

$$J_A = J_C +\hat{j}F.$$

$$\hat{j} = \left(
\begin{matrix}
	b^2 & -ab & 0 \\
	-ab & a^2 & 0 \\
	0 & 0 & b^2+a^2
\end{matrix}
\right)
= \hat{A}^T\hat{A}.
$$


Пусть $B = \{a_1, b_1, 0\}$ - координаты новой точки отсчёта относительно центра тяжести.
$$J_A = J_C + \hat{A}^T\hat{A}F;$$
$$J_B = J_C + \hat{B}^T\hat{B}F = J_A - \hat{A}^T\hat{A}F + \hat{B}^T\hat{B}F = J_A + \left(\hat{B}^T\hat{B} - \hat{A}^T\hat{A}\right)F.$$

$$\hat{B}^T\hat{B} - \hat{A}^T\hat{A}
=
\left(
\begin{matrix}
	b_1^2 & -a_1b_1 & 0 \\
	-a_1b_1 & a_1^2 & 0 \\
	0 & 0 & b_1^2+a_1^2
\end{matrix}
\right)
-
\left(
\begin{matrix}
	b^2 & -ab & 0 \\
	-ab & a^2 & 0 \\
	0 & 0 & b^2+a^2
\end{matrix}
\right)
=
\left(
\begin{matrix}
	b_1^2 -b^2 & ab -a_1b_1 & 0 \\
	ab -a_1b_1 & a_1^2 -a^2 & 0 \\
	0 & 0 & b_1^2+a_1^2 -a^2 -b^2
\end{matrix}
\right).
$$

### При повороте осей координат

Пусть $S$ - матрица поворота новых осей относительно старых. $J'$ - тензор инерции относительно повёрнутых осей.

Оси $x',\, y'$ повёрнуты относительно осей $x, y$ на угол $\alpha$ в положительном направлении.


$$S = \left(
\begin{matrix}
	\cos\alpha & \sin\alpha & 0 \\
	-\sin\alpha & \cos\alpha & 0 \\
	0 & 0 & 1
\end{matrix}
\right);$$

$$J' = SJS^T.$$

$$J' = 
\left(
\begin{matrix}
	\cos\alpha & \sin\alpha & 0 \\
	-\sin\alpha & \cos\alpha & 0 \\
	0 & 0 & 1
\end{matrix}
\right)
\left(
\begin{matrix}
	J_{xx} & -J_{xy} & 0 \\
	-J_{xy} & J_{yy} & 0 \\
	0 & 0 & J_{\rho}
\end{matrix}
\right)
\left(
\begin{matrix}
	\cos\alpha & -\sin\alpha & 0 \\
	\sin\alpha & \cos\alpha & 0 \\
	0 & 0 & 1
\end{matrix}
\right);$$
$$J' =
\left(
\begin{matrix}
	J_{xx}\cos\alpha - J_{xy}\sin\alpha
	&
	-J_{xy}\cos\alpha + J_{yy}\sin\alpha
	&
	0
	\\
	-J_{xx}\sin\alpha - J_{xy}\cos\alpha
	&
	J_{xy}\sin\alpha + J_{yy}\cos\alpha
	&
	0
	\\
	0
	&
	0
	&
	J_p
\end{matrix}
\right)
\left(
\begin{matrix}
	\cos\alpha & -\sin\alpha & 0 \\
	\sin\alpha & \cos\alpha & 0 \\
	0 & 0 & 1
\end{matrix}
\right);
$$

$$J' = \left(
\begin{matrix}
	(J_{xx}\cos\alpha - J_{xy}\sin\alpha)(\cos\alpha)
	+
	(-J_{xy}\cos\alpha + J_{yy}\sin\alpha)(\sin\alpha)
	&
	(J_{xx}\cos\alpha - J_{xy}\sin\alpha)(-\sin\alpha)
	+
	(J_{xy}\cos\alpha + J_{yy}\sin\alpha)(\cos\alpha)
	&

	0
	\\
	(-J_{xx}\sin\alpha - J_{xy}\cos\alpha)(\cos\alpha)
	+
	(-J_{xy}\sin\alpha + J_{yy}\cos\alpha)(\sin\alpha)
	&
	(-J_{xx}\sin\alpha - J_{xy}\cos\alpha)(-\sin\alpha)
	+
	(J_{xy}\sin\alpha + J_{yy}\cos\alpha)(\cos\alpha)
	&
	0
	\\
	0 & 0 & J_p
\end{matrix}
\right);
$$

$$J' = \left(
\begin{matrix}
	J_{xx}\cos^2\alpha
	+J_{yy}\sin^2\alpha
	-J_{xy}\sin2\alpha
	&
	-(
		\frac{1}{2}(J_{xx}-J_{yy})\sin 2\alpha
		+J_{xy}\cos 2\alpha
	)
	&
	0
	\\
	-(
		\frac{1}{2}(J_{xx}-J_{yy})\sin 2\alpha
		+J_{xy}\cos 2\alpha
	)
	&
	J_{xx}\sin^2\alpha
	+J_{yy}\cos^2\alpha
	+J_{xy}\sin 2\alpha
	&
	0
	\\
	0 & 0 & J_p
\end{matrix}
\right);
$$

## Двухмерный вариант

$$J = \left(
\begin{matrix}
J_{xx} & -J_{xy} \\
-J_{xy} & J_{xx} 
\end{matrix}\right)
$$

$$\hat{r} 
= \left(\begin{matrix}
	y \\
	-x
\end{matrix}\right).$$

$$\hat{r}\hat{r}^T = \left(\begin{matrix}
	y^2 & -xy \\
	-xy & x^2
\end{matrix}\right).$$

$$S = \left(
\begin{matrix}
	\cos\alpha & \sin\alpha \\
	-\sin\alpha & \cos\alpha
\end{matrix}
\right);$$

$$J_A = J_C + \hat{r}\hat{r}^T F.$$

$$J' = SJS^T.$$