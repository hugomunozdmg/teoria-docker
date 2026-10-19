#include <stdio.h>

int main(void) {
    printf("¡Hola desde C dentro de Docker!\n");

    int a = 10;
    int b = 20;
    int suma = a + b;

    printf("El primer número es: %d\n", a);
    printf("El segundo número es: %d\n", b);
    printf("La suma es: %d\n", suma);

    return 0;
}
