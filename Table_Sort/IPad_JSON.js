Data = [
            {
                "sku": "MW762",
                "price": 10900,
                "storage": "32GB",
                "description": "10.2 吋 iPad Wi-Fi 機型 32GB - 金色",
                "picture": "ipad_gold.png"
            },
            {
                "sku": "MW792",
                "price": 13900,
                "storage": "128GB",
                "description": "10.2 吋 iPad Wi-Fi 機型 128GB - 金色",
                "picture": "ipad_gold.png"
            },
            {
                "sku": "MW742",
                "price": 10900,
                "storage": "32GB",
                "description": "10.2 吋 iPad Wi-Fi 機型 32GB - 太空灰色",
                "picture": "ipad_space.png"
            },
            {
                "sku": "MW772",
                "price": 13900,
                "storage": "128GB",
                "description": "10.2 吋 iPad Wi-Fi 機型 128GB - 太空灰色",
                "picture": "ipad_space.png"
            },
            {
                "sku": "MW752",
                "price": 10900,
                "storage": "32GB",
                "description": "10.2 吋 iPad Wi-Fi 機型 32GB - 銀色",
                "picture": "ipad_silver.png"
            },
            {
                "sku": "MW782",
                "price": 13900,
                "storage": "128GB",
                "description": "10.2 吋 iPad Wi-Fi 機型 128GB - 銀色",
                "picture": "ipad_silver.png"
            },
            {
                "sku": "MW6D2",
                "price": 15400,
                "storage": "32GB",
                "description": "10.2 吋 iPad Wi-Fi + 行動網路機型 32GB - 金色",
                "picture": "ipad_gold.png"
            },
            {
                "sku": "MW6G2",
                "price": 18400,
                "storage": "128GB",
                "description": "10.2 吋 iPad Wi-Fi + 行動網路機型 128GB - 金色",
                "picture": "ipad_gold.png"
            },
            {
                "sku": "MW6A2",
                "price": 15400,
                "storage": "32GB",
                "description": "10.2 吋 iPad Wi-Fi + 行動網路機型 32GB - 太空灰色",
                "picture": "ipad_space.png"
            },
            {
                "sku": "MW6E2",
                "price": 18400,
                "storage": "128GB",
                "description": "10.2 吋 iPad Wi-Fi + 行動網路機型 128GB - 太空灰色",
                "picture": "ipad_space.png"
            },
            {
                "sku": "MW6C2",
                "price": 15400,
                "storage": "32GB",
                "description": "10.2 吋 iPad Wi-Fi + 行動網路機型 32GB - 銀色",
                "picture": "ipad_silver.png"
            },
            {
                "sku": "MW6F2",
                "price": 18400,
                "storage": "128GB",
                "description": "10.2 吋 iPad Wi-Fi + 行動網路機型 128GB - 銀色",
                "picture": "ipad_silver.png"
            }
        ]

        var table = document.querySelector("table");
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        let status = false; //目前排序狀態
        var sortData; //存放排序後的結果

        function create_tbody(items) {
            let tr = document.createElement("tr");
            for (let item in items) {
                let td = document.createElement("td");
                if (item == "picture") {
                    td.innerHTML = `<img src="${items[item]}">`;
                } else {
                    td.innerHTML = items[item];
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }

        Data.forEach(item => {
            create_tbody(item);
        });

        function Sort(items) {
            //更改icon
            let thGroup = document.getElementsByClassName('icon_status');

            let icon_sku = document.getElementsByClassName("icon_sku");
            let icon_price = document.getElementsByClassName("icon_price");
            let icon_storage = document.getElementsByClassName("icon_storage");

            for (let th of thGroup) {
                th.firstElementChild.classList.remove('fa-sort-down');
                // console.log(th.firstElementChild);
                th.firstElementChild.classList.remove('fa-sort-up');
                th.firstElementChild.classList.remove('fa-sort');
                th.firstElementChild.classList.add('fa-sort');
            }



            //清空tbody
            tbody.innerHTML = '';

            //先小到大
            if (items == "Sku") {
                sortData = Data.sort(function (a, b) {
                    if (!status) {
                        return a.sku > b.sku ? 1 : -1;
                    }
                    else {
                        return a.sku <= b.sku ? 1 : -1;
                    }
                });
                if (status) {
                    // 大到小
                    for (let i of icon_sku) {
                        i.classList.remove('fa-sort');
                        i.classList.remove('fa-sort-down');
                        i.classList.add('fa-sort-up');
                    }

                } else {
                    // 小到大
                    for (let i of icon_sku) {
                        i.classList.remove('fa-sort');
                        i.classList.remove('fa-sort-up');
                        i.classList.add('fa-sort-down');
                    }

                }
            }
            else if (items == "Price") {
                sortData = Data.sort(function (a, b) {
                    if (!status) {
                        return Number(a.price) > Number(b.price) ? 1 : -1;
                    }
                    else {
                        return Number(a.price) <= Number(b.price) ? 1 : -1;
                    }
                });
                if (status) {
                    // 大到小
                    for (let i of icon_price) {
                        i.classList.remove('fa-sort');
                        i.classList.remove('fa-sort-down');
                        i.classList.add('fa-sort-up');
                    }

                } else {
                    // 小到大
                    for (let i of icon_price) {
                        i.classList.remove('fa-sort');
                        i.classList.remove('fa-sort-up');
                        i.classList.add('fa-sort-down');
                    }

                }
            }
            else if (items == "Storage") {
                sortData = Data.sort(function (a, b) {
                    if (!status) {
                        return a.storage.padStart(10, '0') > b.storage.padStart(10, '0') ? 1 : -1;
                    }
                    else {
                        return a.storage.padStart(10, '0') <= b.storage.padStart(10, '0') ? 1 : -1;
                    }
                });
                if (status) {
                    // 大到小
                    for (let i of icon_storage) {
                        i.classList.remove('fa-sort');
                        i.classList.remove('fa-sort-down');
                        i.classList.add('fa-sort-up');
                    }

                } else {
                    // 小到大
                    for (let i of icon_storage) {
                        i.classList.remove('fa-sort');
                        i.classList.remove('fa-sort-up');
                        i.classList.add('fa-sort-down');
                    }

                }
            }

            //新結果
            for (let element of sortData) {
                let tr = document.createElement('tr');
                for (let prop in element) {
                    let td = document.createElement('td');
                    if (prop == "picture") {
                        td.innerHTML = `<img src="${element[prop]}">`;
                    }
                    else {
                        td.innerHTML = element[prop];
                    }

                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }

            // if (status) {
            //     // 大到小
            //     // console.log(status);
            //     for (let th of thGroup) {
            //         th.firstElementChild.classList.remove('fa-sort');
            //         th.firstElementChild.classList.remove('fa-sort-down');
            //         th.firstElementChild.classList.add('fa-sort-up');
            //     }

            // } else {
            //     // 小到大
            //     // console.log(status);
            //     for (let th of thGroup) {
            //         th.firstElementChild.classList.remove('fa-sort');
            //         th.firstElementChild.classList.remove('fa-sort-up');
            //         th.firstElementChild.classList.add('fa-sort-down');
            //     }

            // }

            status = !status;
        }