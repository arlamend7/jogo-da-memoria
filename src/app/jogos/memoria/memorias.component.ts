import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import "@dev.arlamend7/js-ts/common";
import {notificationService} from "@dev.arlamend7/js-ts/web/window/notification";
@Component({
    templateUrl:"memorias.component.html"
})
export class JogoDaMemoriaComponent implements OnInit{
    listaTotal : Carta[] = []
    numeros : Carta[] = [
        {
            id:1,
            imagem : "um.png",
            possuiImagem : true
        },
        {
            id:2,
            imagem : "dois.png",
            possuiImagem : true
        },
        {
            id:3,
            imagem : "tres.png",
            possuiImagem : true
        },
        {
            id:4,
            imagem : "quatro.png",
            possuiImagem : true
        },
        {
            id:5,
            imagem : "cinco.png",
            possuiImagem : true
        },
        {
            id:6,
            imagem : "seis.png",
            possuiImagem : true
        },
        {
            id:7,
            imagem : "sete.png",
            possuiImagem : true
        },
        {
            id:8,
            imagem : "oito.png",
            possuiImagem : true
        },
        {
            id:9,
            imagem : "nove.png",
            possuiImagem : true
        },
        {
            id:10,
            imagem : "dez.png",
            possuiImagem : true
        },
    ]
    constructor(private title : Title){
        title.setTitle("Jogo da Memoria");
    }
    finalizado = false;
    ngDoCheck(){
        if(!this.finalizado && !this.disabled && this.listaTotal.every(x => x.aberto)){
            setTimeout(() => {
                window.alert("Parabéns, você ganhou o jogo!");
                this.finalizado = true;
            },1000)
        }

    }
    ngOnInit(): void {
        var segundaLista : Carta[]= []
        this.numeros.forEach(x => {
            var item = <Carta>Object.create(x)
            item.possuiImagem = false
            item.name = item.imagem.replace(/\.\w*/,'')
            segundaLista.push(item)
        })
        this.listaTotal.push(...this.numeros) 
        this.listaTotal.push(...segundaLista.map(x => {x.possuiImagem = false; return x})) 
        this.listaTotal.sort(x => Math.round(Math.random()) * -1);
        this.listaTotal.map(x => {x.aberto = true; return x})
        setTimeout(() => {
            this.listaTotal.map(x => {x.aberto = false; return x});
            this.disabled = false;
        },5000);        
    }
    itemAnterior : Carta = new Carta({})
    disabled = true
    abrir(item : Carta){
        if(this.disabled || item.aberto)
            return;
        item.aberto = true
        if(!this.itemAnterior.id)
            this.itemAnterior = item;
        else{
            if(this.itemAnterior.id != item.id){
                this.disabled = true;
                setTimeout(() => {
                    this.itemAnterior.aberto = false;
                    item.aberto = false;
                    this.itemAnterior = new Carta({})

                    this.disabled = false;
                },1500); 
            }
            else{
                this.itemAnterior = new Carta({})
            }
            
        }
    }
}
class Carta{
    id : number | null
    imagem : string
    possuiImagem : boolean
    name? : string
    aberto? : boolean
    constructor(params : Partial<Carta>){
        this.id = params.id || null;
        this.imagem = params.imagem || "";
        this.possuiImagem = params.possuiImagem || false;
        this.aberto = false;

    }
}