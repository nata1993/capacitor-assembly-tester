# Capacitor assembly tester

This simple webtool allows to check capacitor banks assemblies of five types for correct assembly.
This implies only the checking of material code label on the capacitors themselves and verifiying
it visually with what is required to be used. Since capacitor banks may have dosens and dosens of
capacitors, this tool simplifies reading of material codes on the capacitors themselves, reducing
human error of reading small text over and over. This tool also reduces risk of assemblying a
capacitor bank with some capacitors with wrong type.  

## Working principle

Capacitor banks have material code label on them. Essentially it is a kit code that consists of
different required materials for assembly of the capacitor bank. Capacitors themselves also have
a material code label on them. Under this material code is a capacitor with defined caracteristics.
This tool allows to choose capacitor banks material code, essetnially choosing what type of capacitors
must be used in the assembly. Then scanning material code on the capacitors with bar reader, will
start the process of checking if the capacitor is suitable for specific bank assembly by verifying
the capacitor assembly and capacitor banks material code labels predefined combination. The output
of this tool will be simple OK or NOK type feedback where if everything corresponds to the predefined
rules, the screen will blink one with green colour and a text pops up with the scanned terms (material
code, voltage rating, capacitance rating, required ammount). If any of the capacitors have incorrect
material code label, the screen will blink with red and a text feedback that scanned capacitor is of
incorrect type.

## Limitations

The capacitors material code label may be printed of wrong capacitor type on the supplier side.
This tool can not test for this. Because of this, visual inspection is required for voltage and
capacitance ratings printed on the capacitors. The voltage and capacitance ratings are printed
with much bigger font size, therefore easier to inspect for wrong capacitors in the capacitor
bank assembly by visual means.
