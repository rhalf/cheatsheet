
export default {
    created() {

    },

    data() {
        return {
            stocks: [
                { "name": "2GO Group", "code": "2GO" }, { "name": "Atok A", "code": "AB" }, { "name": "ABACORE CAPITAL", "code": "ABA" }, { "name": "Asiabest Gorup", "code": "ABG" }, { "name": "ABS-CBN", "code": "ABS" }, { "name": "ABS-CBN PDR", "code": "ABSP" }, { "name": "Ayala Corp", "code": "AC" }, { "name": "Acesite Hotel", "code": "ACE" }, { "name": "AC ENERGY", "code": "ACEN" }, { "name": "AC ENEXOR", "code": "ACEX" }, { "name": "Alsons Cons", "code": "ACR" }, { "name": "Aboitiz", "code": "AEV" }, { "name": "Alliance Global", "code": "AGI" }, { "name": "Arthaland", "code": "ALCO" }, { "name": "ALCPC PREF C", "code": "ALCPC" }, { "name": "Anchor Land", "code": "ALHI" }, { "name": "Ayala Land", "code": "ALI" }, { "name": "AYALA LAND LOG", "code": "ALLHC" }, { "name": "AgriNurture", "code": "ANI" }, { "name": "Anscor", "code": "ANS" }, { "name": "Aboitiz Power", "code": "AP" }, { "name": "APC Group", "code": "APC" }, { "name": "APOLLO GLOBAL", "code": "APL" }, { "name": "Anglo-Phil Hldg", "code": "APO" }, { "name": "ALTUS PROP", "code": "APVI" }, { "name": "Apex Mining A", "code": "APX" }, { "name": "Abra Mining", "code": "AR" }, { "name": "Araneta Prop", "code": "ARA" }, { "name": "AREIT RT", "code": "AREIT" }, { "name": "Atlas Mining", "code": "AT" }, { "name": "Asian Terminals", "code": "ATI" }, { "name": "ATN Holdings A", "code": "ATN" }, { "name": "ATN Holdings B", "code": "ATNB" }, { "name": "ASIA UNITED", "code": "AUB" }, { "name": "AXELUM", "code": "AXLM" }, { "name": "Benguet A", "code": "BC" }, { "name": "Benguet B", "code": "BCB" }, { "name": "Prime Gaming", "code": "BCOR" }, { "name": "Benguet Pref. A", "code": "BCP" }, { "name": "Banco de Oro", "code": "BDO" }, { "name": "Belle Corp.", "code": "BEL" }, { "name": "Boulevard Hldg.", "code": "BHI" }, { "name": "Bright Kindle", "code": "BKR" }, { "name": "Bloomberry", "code": "BLOOM" }, { "name": "Bogo Medellin", "code": "BMM" }, { "name": "BPI", "code": "BPI" }, { "name": "A. Brown", "code": "BRN" }, { "name": "Basic Energy Corporation", "code": "BSC" }, { "name": "CHELSEA", "code": "C" }, { "name": "Concrete A", "code": "CA" }, { "name": "Concrete B", "code": "CAB" }, { "name": "Tarlac", "code": "CAT" }, { "name": "Cityland Devt.", "code": "CDC" }, { "name": "5J", "code": "CEB" }, { "name": "Crown Equities", "code": "CEI" }, { "name": "Cebu Holdings", "code": "CHI" }, { "name": "Chinabank", "code": "CHIB" }, { "name": "Cemex Hldg", "code": "CHP" }, { "name": "CONCEPCION", "code": "CIC" }, { "name": "CEB LANDMASTERS", "code": "CLI" }, { "name": "CENTURY FOOD", "code": "CNPF" }, { "name": "CONVERGE", "code": "CNVRG" }, { "name": "Coal Asia", "code": "COAL" }, { "name": "COL Financial", "code": "COL" }, { "name": "COSCO CAPITAL", "code": "COSCO" }, { "name": "CPG", "code": "CPG" }, { "name": "CPG PREF A", "code": "CPGP" }, { "name": "CENTURY PEAK", "code": "CPM" }, { "name": "CROWN ASIA", "code": "CROWN" }, { "name": "Citystate Bank", "code": "CSB" }, { "name": "Cyber Bay", "code": "CYBR" }, { "name": "DAVINCI CAPITAL", "code": "DAVIN" }, { "name": "DOUBLEDRAGON", "code": "DD" }, { "name": "DD PREF", "code": "DDPR" }, { "name": "DEL MONTE", "code": "DELM" }, { "name": "Diversified", "code": "DFNN" }, { "name": "ISM Comm.", "code": "DITO" }, { "name": "Dizon Mines", "code": "DIZ" }, { "name": "DMCI Holdings", "code": "DMC" }, { "name": "USD DMPL A1", "code": "DMPA1" }, { "name": "DM WENCESLAO", "code": "DMW" }, { "name": "DNL INDUS", "code": "DNL" }, { "name": "DISCOVERY WORLD", "code": "DWC" }, { "name": "EAGLE CEMENT", "code": "EAGLE" }, { "name": "Easycall", "code": "ECP" }, { "name": "EEI Corp.", "code": "EEI" }, { "name": "Empire East", "code": "ELI" }, { "name": "EMPERADOR", "code": "EMP" }, { "name": "Euromed", "code": "EURO" }, { "name": "Ever-Gotesco", "code": "EVER" }, { "name": "EW", "code": "EW" }, { "name": "First Abacus", "code": "FAF" }, { "name": "Purefoods", "code": "FB" }, { "name": "Filinvest Dev.", "code": "FDC" }, { "name": "FERRONOUX HLDG", "code": "FERRO" }, { "name": "Far Eastern U.", "code": "FEU" }, { "name": "First Gen", "code": "FGEN" }, { "name": "F&J Prince A", "code": "FJP" }, { "name": "Filinvest Land", "code": "FLI" }, { "name": "FIRST METRO ETF", "code": "FMETF" }, { "name": "FERRONICKEL", "code": "FNI" }, { "name": "Tuna", "code": "FOOD" }, { "name": "First Phil Hldg", "code": "FPH" }, { "name": "Forum Pacific", "code": "FPI" }, { "name": "FRUITAS HLDG", "code": "FRUIT" }, { "name": "GEOGRACE", "code": "GEO" }, { "name": "Global-Estate", "code": "GERI" }, { "name": "Globe Telecom", "code": "GLO" }, { "name": "GMA Network", "code": "GMA7" }, { "name": "GMA Holdings", "code": "GMAP" }, { "name": "Grand Plaza", "code": "GPH" }, { "name": "GREEN", "code": "GREEN" }, { "name": "Ginebra", "code": "GSMI" }, { "name": "GT Capital", "code": "GTCAP" }, { "name": "House of Inv", "code": "HI" }, { "name": "Holcim", "code": "HLCM" }, { "name": "ALLHOME", "code": "HOME" }, { "name": "8990 HLDG", "code": "HOUSE" }, { "name": "GOLDEN BRIA", "code": "HVN" }, { "name": "IRemit", "code": "I" }, { "name": "Intl Container", "code": "ICT" }, { "name": "Italpinas", "code": "IDC" }, { "name": "Integ. Micro", "code": "IMI" }, { "name": "IMPERIAL", "code": "IMP" }, { "name": "Ionics", "code": "ION" }, { "name": "IPM HLDG", "code": "IPM" }, { "name": "PHIL INFRADEV", "code": "IRC" }, { "name": "Island Info", "code": "IS" }, { "name": "Jackstones", "code": "JAS" }, { "name": "Jollibee", "code": "JFC" }, { "name": "JG Summit", "code": "JGS" }, { "name": "Jolliville Hldg", "code": "JOH" }, { "name": "Keppel Prop", "code": "KEP" }, { "name": "KEPWEALTH", "code": "KPPI" }, { "name": "City & Land", "code": "LAND" }, { "name": "LBC EXPRESS", "code": "LBC" }, { "name": "Lepanto A", "code": "LC" }, { "name": "Lepanto B", "code": "LCB" }, { "name": "Liberty Flour", "code": "LFM" }, { "name": "Lodestar", "code": "LIHC" }, { "name": "LMG Corp", "code": "LMG" }, { "name": "Pacific Online", "code": "LOTO" }, { "name": "Benpres Hldg.", "code": "LPZ" }, { "name": "Leisure", "code": "LR" }, { "name": "LR WARRANT", "code": "LRW" }, { "name": "LorenzoShipping", "code": "LSC" }, { "name": "LT GROUP", "code": "LTG" }, { "name": "Manila Mining A", "code": "MA" }, { "name": "Manila Mining B", "code": "MAB" }, { "name": "Macroasia", "code": "MAC" }, { "name": "MACAY HLDG", "code": "MACAY" }, { "name": "MetroAlliance A", "code": "MAH" }, { "name": "MetroAlliance B", "code": "MAHB" }, { "name": "Marcventures", "code": "MARC" }, { "name": "MAXS GROUP", "code": "MAXS" }, { "name": "Manila Bulletin", "code": "MB" }, { "name": "MlaBroadcasting", "code": "MBC" }, { "name": "Metrobank", "code": "MBT" }, { "name": "Medco Hldg.", "code": "MED" }, { "name": "Megaworld", "code": "MEG" }, { "name": "Meralco A", "code": "MER" }, { "name": "Manulife", "code": "MFC" }, { "name": "Makati Finance", "code": "MFIN" }, { "name": "MG HOLDINGS", "code": "MG" }, { "name": "Mabuhay Hldg.", "code": "MHC" }, { "name": "Manila Jockey", "code": "MJC" }, { "name": "MERRYMART", "code": "MM" }, { "name": "Metro Pac Inv ", "code": "MPI" }, { "name": "MRC Allied", "code": "MRC" }, { "name": "Metro Retail", "code": "MRSGI" }, { "name": "Manila Water", "code": "MWC" }, { "name": "Megawide", "code": "MWIDE" }, { "name": "MWIDE PREF", "code": "MWP" }, { "name": "MWIDE PREF 2B", "code": "MWP2B" }, { "name": "NiHAO", "code": "NI" }, { "name": "NICKELASIA", "code": "NIKL" }, { "name": "NOW CORP", "code": "NOW" }, { "name": "PhilNaRe", "code": "NRCP" }, { "name": "Omico Corp.", "code": "OM" }, { "name": "ORNTL PETROL A", "code": "OPM" }, { "name": "ORNTL PETROL B", "code": "OPMB" }, { "name": "Oriental P", "code": "ORE" }, { "name": "Philodrill A", "code": "OV" }, { "name": "PACIFICA HLDG", "code": "PA" }, { "name": "PAL Holdings", "code": "PAL" }, { "name": "Paxys", "code": "PAX" }, { "name": "PB BANK", "code": "PBB" }, { "name": "PBCom", "code": "PBC" }, { "name": "Petron", "code": "PCOR" }, { "name": "PetroEnergy", "code": "PERC" }, { "name": "PUREGOLD", "code": "PGOLD" }, { "name": "PremiereHorizon", "code": "PHA" }, { "name": "Phil Estates", "code": "PHES" }, { "name": "Phinma ", "code": "PHN" }, { "name": "PH RESORTS GRP", "code": "PHR" }, { "name": "SHAKEYS PIZZA", "code": "PIZZA" }, { "name": "PREMIUM LEISURE", "code": "PLC" }, { "name": "Panasonic", "code": "PMPC" }, { "name": "Phil Natl Bank", "code": "PNB" }, { "name": "PHX PETROLEUM", "code": "PNX" }, { "name": "PNX PREF 3B", "code": "PNX3B" }, { "name": "PNX PREF 4", "code": "PNX4" }, { "name": "Pryce Corp.", "code": "PPC" }, { "name": "Phil. Racing ", "code": "PRC" }, { "name": "PCOR PREF 3B", "code": "PRF3B" }, { "name": "Prime Media", "code": "PRIM" }, { "name": "Primex Corp.", "code": "PRMX" }, { "name": "PSBank", "code": "PSB" }, { "name": "PSE", "code": "PSE" }, { "name": "PX MINING", "code": "PX" }, { "name": "PXP ENERGY", "code": "PXP" }, { "name": "RCBC", "code": "RCB" }, { "name": "CADP Group", "code": "RCI" }, { "name": "Republic Glass", "code": "REG" }, { "name": "RFM Corp", "code": "RFM" }, { "name": "Robinsons Land", "code": "RLC" }, { "name": "PhilRealty", "code": "RLT" }, { "name": "ROCK", "code": "ROCK" }, { "name": "ROBINSONS RTL", "code": "RRHI" }, { "name": "SBS Phil Corp", "code": "SBS" }, { "name": "Semirara Mining", "code": "SCC" }, { "name": "Security Bank", "code": "SECB" }, { "name": "11-Jul", "code": "SEVN" }, { "name": "Swift", "code": "SFI" }, { "name": "Solid Group", "code": "SGI" }, { "name": "TRANSGRID", "code": "SGP" }, { "name": "PILIPINAS SHELL", "code": "SHLPH" }, { "name": "SHNG Properties", "code": "SHNG" }, { "name": "Sun Life", "code": "SLF" }, { "name": "Sta.Lucia Land", "code": "SLI" }, { "name": "SM Investments ", "code": "SM" }, { "name": "San Miguel A", "code": "SMC" }, { "name": "SMCPrefs2C", "code": "SMC2C" }, { "name": "SMC Pref 2F", "code": "SMC2F" }, { "name": "SMC PREF 2J", "code": "SMC2J" }, { "name": "SMC PREF 2K", "code": "SMC2K" }, { "name": "SM Prime Hldg.", "code": "SMPH" }, { "name": "SOC RESOURCES", "code": "SOC" }, { "name": "SPC POWER", "code": "SPC" }, { "name": "Seafront Res.", "code": "SPM" }, { "name": "SSI GROUP", "code": "SSI" }, { "name": "PHX SEMICNDCTR", "code": "SSP" }, { "name": "STI_HOLDINGS", "code": "STI" }, { "name": "Starmalls", "code": "STR" }, { "name": "Suntrust Home", "code": "SUN" }, { "name": "TKC METALS", "code": "T" }, { "name": "Transpacific Br", "code": "TBGI" }, { "name": "CHIPS", "code": "TECH" }, { "name": "PLDT", "code": "TEL" }, { "name": "TOP FRONTIER", "code": "TFHI" }, { "name": "HARBOR STAR", "code": "TUGS" }, { "name": "Union Bank", "code": "UBP" }, { "name": "United Paragon", "code": "UPM" }, { "name": "Univ Robina", "code": "URC" }, { "name": "IVantage", "code": "V" }, { "name": "Vitarich", "code": "VITA" }, { "name": "Vista Land", "code": "VLL" }, { "name": "Vulcan Ind`l", "code": "VUL" }, { "name": "Vivant", "code": "VVT" }, { "name": "PhilWeb", "code": "WEB" }, { "name": "Wellex Indus", "code": "WIN" }, { "name": "WILCON DEPOT", "code": "WLCON" }, { "name": "Waterfront", "code": "WPI" }, { "name": "Zeus Holdings", "code": "ZHI" }, { "name": "PSEi", "code": "PSEi" }, { "name": "All Shares", "code": "ALL" }, { "name": "Financials", "code": "FIN" }, { "name": "Industrial", "code": "IND" }, { "name": "Holding Firms", "code": "HDG" }, { "name": "Property", "code": "PRO" }, { "name": "Services", "code": "SVC" }, { "name": "Mining and Oil", "code": "M-O" }
            ],
            filtered: []
        }
    },

    methods: {
        getStock(code) {
            var item = {}
            this.stocks.forEach(stock => {
                if (stock.code == code) {
                    item = stock
                }
            });
            return item
        },

        getBuyingFee(amount, share) {
            var gross = (amount * share)
            // var commission = gross * 0.005 //0.5%
            var commission = gross * 0.0025 //0.25%
            if (commission < 20) commission = 20

            var vat = commission * 0.12 //12%
            var pse = gross * 0.00005 //0.005%
            var sccp = gross * 0.0001 //0.01%

            var result = commission + vat + pse + sccp


            return this.round(result, 2)
        },
        getSellingFee(amount, share) {
            var gross = (amount * share)
            // var commission = gross * 0.005 //0.5%
            var commission = gross * 0.0025 //0.25%
            if (commission < 20) commission = 20

            var vat = commission * 0.12 //12%
            var pse = gross * 0.00005 //0.005%
            var sccp = gross * 0.0001 //0.01%
            var sales = gross * 0.006 //0.06%

            var result

            result = commission + vat + pse + sccp + sales

            return this.round(result, 2)
        },

        getBuyingAmountNet(price, shares, others) {
            var comTax = this.getBuyingFee(price, shares)
            return (price * shares) + comTax + others
        },
        getSellingAmountNet(price, shares, others) {
            var comTax = this.getSellingFee(price, shares);
            return (price * shares) - comTax - others;
        },

        round(result, decimals) {
            return Number(Math.round(result + 'e' + decimals) + 'e-' + decimals);
        },


        generateClosedTrades(container, trades, active) {
            //=============================================
            var organizer = [];
            trades.forEach((trade) => {
                if (container == null) return;

                var stock = false;
                organizer.forEach((group) => {
                    if (group.stockCode == trade.stockCode) {
                        group.trades.unshift(trade);
                        stock = true;
                    }
                });

                if (!stock) {
                    var group = {
                        stockCode: trade.stockCode,
                        trades: [],
                    };
                    group.trades.unshift(trade);
                    organizer.push(group);
                }
            });
            // console.log(JSON.stringify(organizer));

            organizer.forEach((group) => {
                var buffer = null;

                // group.trades.sort(function(tradeA, tradeB) {
                //     var a = new Date(tradeA.date);
                //     var b = new Date(tradeB.date);
                //     return a-b;
                // });
                //console.log(JSON.stringify(group));

                group.trades.forEach((trade) => {
                    buffer = this.absorbTrade(buffer, trade);
                    if (buffer.sharesCurrent == 0) {
                        container.push(buffer);
                        buffer = null
                    }
                });
                //========================================================
                if (buffer) {
                    // console.log(buffer);
                    buffer.shares = buffer.sharesCurrent
                    this.axios
                        .get(
                            "http://phisix-api.appspot.com/stocks/" + buffer.stockCode + ".json"
                        )
                        .then((response) => {
                            var price = response.data.stock[0].price.amount
                            var trade = {
                                transaction: "sell",
                                date: new Date().getTime(),
                                stockCode: buffer.stockCode,
                                price: price,
                                shares: buffer.sharesCurrent,
                                feeOthers: 0,
                                feeComTax: this.getSellingFee(price, buffer.sharesCurrent),
                                amountGross: (price * buffer.sharesCurrent),
                                amountNet: this.getSellingAmountNet(price, buffer.sharesCurrent, 0)
                            }

                            buffer = this.absorbTrade(buffer, trade)
                            //    console.log(trade);
                            active.push(buffer)
                        }).catch(error => {
                            console.log(error);
                        });
                }    // if (buffer) console.log(JSON.stringify(buffer));

                // if (buffer) active.push(buffer)
            });
        },
        absorbTrade(buffer, trade) {
            if (!buffer) {
                buffer = {};
                buffer.stockCode = trade.stockCode;
                buffer.shares = trade.shares;
                buffer.buyDate = "";
                buffer.sharesCurrent = 0;
                buffer.feeComTax = 0;
                buffer.feeOthers = 0;
                buffer.buyAve = 0;
                buffer.buyAmountGross = 0;
                buffer.buyAmountNet = 0;
                buffer.buyCount = 0;
                buffer.sellAve = 0;
                buffer.sellAmountGross = 0;
                buffer.sellAmountNet = 0;
                buffer.sellDate = "";
                buffer.sellCount = 0;

                if (trade.transaction == "buy") {
                    buffer.shares = trade.shares;
                    buffer.sharesCurrent = trade.shares;
                    buffer.feeComTax = trade.feeComTax;
                    buffer.feeOthers = trade.feeOthers;

                    buffer.buyDate = trade.date;
                    buffer.buyAve = trade.price;
                    buffer.buyAmountGross = trade.amountGross;
                    buffer.buyAmountNet = trade.amountNet;
                    buffer.buyCount = 1;
                }
                if (trade.transaction == "sell") {
                    buffer.sharesCurrent -= trade.shares;
                    buffer.feeComTax = trade.feeComTax;
                    buffer.feeOthers = trade.feeOthers;

                    buffer.sellDate = trade.date;
                    buffer.sellAve = trade.price;
                    buffer.sellAmountGross = trade.amountGross;
                    buffer.sellAmountNet = trade.amountNet;

                    buffer.sellCount = 1;
                }
            } else {
                if (trade.transaction == "buy") {
                    buffer.shares += trade.shares;
                    buffer.buyCount++;
                    buffer.sharesCurrent += trade.shares;
                    buffer.buyAve += trade.price;
                    buffer.buyAmountGross += trade.amountGross;
                    buffer.buyAmountNet += trade.amountNet;
                    buffer.feeComTax += trade.feeComTax;
                    buffer.feeOthers += trade.feeOthers;
                }
                if (trade.transaction == "sell") {
                    buffer.sharesCurrent -= trade.shares;
                    buffer.sellCount++;
                    buffer.sellAve += trade.price;
                    buffer.sellAmountGross += trade.amountGross;
                    buffer.sellAmountNet += trade.amountNet;
                    buffer.feeComTax += trade.feeComTax;
                    buffer.feeOthers += trade.feeOthers;
                }
            }

            if (buffer.sharesCurrent == 0) {
                buffer.buyAve /= buffer.buyCount;
                buffer.buyAmountGross /= buffer.buyCount;
                buffer.buyAmountNet /= buffer.buyCount;

                buffer.sellAve /= buffer.sellCount;
                buffer.sellAmountGross /= buffer.sellCount;
                buffer.sellAmountNet /= buffer.sellCount;

                buffer.sellDate = trade.date;

                buffer.profitAmountGross =
                    buffer.sellAmountGross - buffer.buyAmountGross;
                buffer.profitAmountNet = buffer.sellAmountNet - buffer.buyAmountNet;
                buffer.profitAmountRate =
                    (buffer.profitAmountNet / buffer.buyAmountNet) * 100;
                buffer.status = buffer.profitAmountRate > 0 ? "win" : "lose";
                buffer.days = this.daysDiff(buffer.sellDate, buffer.buyDate)
                // console.log(buffer.days)

            }

            // console.log(JSON.stringify(buffer));
            return buffer
        },
        daysDiff(day1, day2) {
            var diff = day1 - day2
            var result = Math.ceil(Math.abs(diff) / (1000 * 3600 * 24))
            return result;
        }

    }
}

