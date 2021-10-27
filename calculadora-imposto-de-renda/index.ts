interface IEmpregado {
    nome:  string;
    salarioBruto: number;
    quantidadelHorasExtras: number;
    vlTotalHorasExtras: number;
    faixaDescontoINSS: number;
    vlDescontadoINSS: number;
    faixaDescontoIR: number;
    vlDescontadoIR: number;
    vlSalarioLiquido: number;
}

class Empregado {
    private empregado: IEmpregado

    constructor() {
        this.empregado = {} as IEmpregado;
		this.empregado.nome = "";
        this.empregado.salarioBruto = 0;
        this.empregado.quantidadelHorasExtras = 0;
        this.empregado.vlTotalHorasExtras = 0;
        this.empregado.faixaDescontoINSS = 0;
        this.empregado.vlDescontadoINSS = 0;
        this.empregado.faixaDescontoIR = 0;
        this.empregado.vlDescontadoIR = 0;
        this.empregado.vlSalarioLiquido = 0;
    }

    setNome(nome: string) {
		this.empregado.nome = nome;
	}

    getNome() {
        return this.empregado.nome;
    }

    setSalarioBruto(salarioBruto: number) {
		this.empregado.salarioBruto = salarioBruto;
	}

    getSalarioBruto() {
		return this.empregado.salarioBruto;
	}

    setValorTotalHorasExtras(valorTotalHorasExtras: number) {
		this.empregado.vlTotalHorasExtras = valorTotalHorasExtras;
	}

    getValorTotalHorasExtras() {
		return this.empregado.vlTotalHorasExtras;
	}

    setQuantidadelHorasExtras(quantidadelHorasExtras: number) {
		this.empregado.quantidadelHorasExtras = quantidadelHorasExtras;
	}

    getQuantidadelHorasExtras() {
		return this.empregado.quantidadelHorasExtras;
	}

    setFaixaDescontoINSS(faixaDescontoINSS: number) {
		this.empregado.faixaDescontoINSS = faixaDescontoINSS;
	}

    getFaixaDescontoINSS() {
		return this.empregado.faixaDescontoINSS ;
	}

    setValorDescontadoINSS(valorDescontadoINSS: number) {
		this.empregado.vlDescontadoINSS = valorDescontadoINSS;
	}

    getValorDescontadoINSS() {
		return this.empregado.vlDescontadoINSS;
	}

    setFaixaDescontoIR(faixaDescontoIR: number) {
		this.empregado.faixaDescontoIR = faixaDescontoIR;
	}

    getFaixaDescontoIR() {
		return this.empregado.faixaDescontoIR;
	}

    setValorDescontadoIR(valorDescontadoIR: number) {
		this.empregado.vlDescontadoIR = valorDescontadoIR;
	}

    getValorDescontadoIR() {
		return this.empregado.vlDescontadoIR;
	}

    setValorSalarioLiquido(valorSalarioLiquido: number) {
		this.empregado.vlSalarioLiquido = valorSalarioLiquido;
	}

    getValorSalarioLiquido() {
		return this.empregado.vlSalarioLiquido;
	}
}

const empregado = new Empregado();

function calculaHorasExtras() {
    let horasExtras = 0,
        salario = empregado.getSalarioBruto(),
        quantidadelHorasExtras = empregado.getQuantidadelHorasExtras();

    horasExtras = ((salario / 200) * 1.5) * quantidadelHorasExtras;
    salario = salario + horasExtras
    
    empregado.setValorTotalHorasExtras(horasExtras);

    //Salário Líquido (salário bruto + horas extras)
    empregado.setValorSalarioLiquido(salario);

    console.log('Calculando horas extras');
    console.log('Valor das horas calculadas: ' + horasExtras + '\n');
}

function calcularDescontoINSS() {
    let aliquota = 0,
        valorComDescontoINSS = 0,
        salario = empregado.getValorSalarioLiquido();

    switch (true) {
        case (salario <= 1100): 
			aliquota = 7.5;
			break;
		
		case (salario > 1100.01 && salario <= 2203.48): 
			aliquota = 9;
			break;
		
		case (salario > 2203.48 && salario <= 3305.22): 
			aliquota = 12;
			break;
		
		case (salario > 3305.22): 
			aliquota = 14;
			break;
    }
    
    valorComDescontoINSS = salario * (aliquota / 100);

    if (valorComDescontoINSS >= 713.09) {
        valorComDescontoINSS = 713.09;
    }

    salario = salario - valorComDescontoINSS;

    empregado.setFaixaDescontoINSS(aliquota);
    empregado.setValorDescontadoINSS(valorComDescontoINSS);

    //Salário Líquido (salário bruto + horas extras - INSS)
    empregado.setValorSalarioLiquido(salario);

    console.log('Calculando descontos do INSS');
    console.log('Faixa INSS: ' + aliquota);
    console.log('Valor descontado de INSS: ' + valorComDescontoINSS + '\n');
}

function calcularDescontoIRRF() {
    let aliquota = 0,
        valorComDescontoIRRF = 0,
        salario = empregado.getValorSalarioLiquido();

    switch (true) {
		case (salario <= 1903.98): 
			aliquota = 0;
			break;
		
		case (salario >= 1903.99 && salario <= 2826.65): 
			aliquota = 7.5;
			break;
		
		case (salario >= 2826.66 && salario <= 3751.05): 
			aliquota = 15;
			break;
		
		case (salario >= 3751.06 && salario <= 4664.68): 
			aliquota = 22.5;
			break;

		case (salario > 4664.68): 
			aliquota = 27.5;
			break;
	}

    valorComDescontoIRRF = salario * (aliquota/100);

    salario = salario - valorComDescontoIRRF;

    empregado.setFaixaDescontoIR(aliquota);
    empregado.setValorDescontadoIR(valorComDescontoIRRF);

    //Salário Líquido (salário bruto - desconto INSS - desconto IR + horas extras)
    empregado.setValorSalarioLiquido(salario);

    console.log('Calculando descontos do IRRF');
    console.log('Faixa IRRF: ' + aliquota);
    console.log('Valor descontado de IRRF: ' + valorComDescontoIRRF + '\n');

    console.log('---------------------------------------------');
    console.log('SALÁRIO LÍQUIDO: (salário bruto - desconto INSS - desconto IR + horas extras)' );
    console.log(salario);
}

function calculaSalario(nome: string, salario: string, quantidadelHorasExtras?: string) {
    console.log('SALÁRIO: ' + salario + '\n');
    
    empregado.setNome(nome);
    empregado.setSalarioBruto(parseFloat(salario));
    empregado.setQuantidadelHorasExtras(parseFloat(quantidadelHorasExtras));

    calculaHorasExtras();
    calcularDescontoINSS();
    calcularDescontoIRRF();

    console.log('---------- DADOS DO EMPREGADO ----------');
    montaRetorno();
}

function montaRetorno() {
    console.log({
        'Nome': empregado.getNome(),
        'Valor salário bruto': empregado.getSalarioBruto(),
        'Quantidade horas extras': empregado.getQuantidadelHorasExtras(),
        'Valor total de horas extra': empregado.getValorTotalHorasExtras(),
        'Faixa de desconto do INSS': empregado.getFaixaDescontoINSS(),
        'Valor descontado para o INSS': empregado.getValorDescontadoINSS(),
        'Faixa de desconto do IR': empregado.getFaixaDescontoIR(),
        'Valor descontado para o IR': empregado.getValorDescontadoIR(),
        'Valor salário líquido': empregado.getValorSalarioLiquido()
    })
}

calculaSalario(process.argv[2], process.argv[3], process.argv[4]);