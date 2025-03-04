#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS models;

DROP TABLE IF EXISTS manufacturers;

CREATE TABLE manufacturers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

CREATE TABLE models (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    year INTEGER,
    price INTEGER,
    imgurl TEXT,
    odometer INTEGER,
    description TEXT,
    makekey INTEGER
);

INSERT INTO manufacturers (name)
VALUES ('Nissan'), ('Mazda'), ('Honda'), ('Subaru');

INSERT INTO models (name, year, price, imgurl, odometer, description, makekey)
VALUES 
('300ZX', 2000, 22000, 'https://upload.wikimedia.org/wikipedia/commons/8/8b/RedZ32.jpg', 139563, 'Recently had bottom end engine rebuild. Larger intercoolers, turbos and throttle bodies fitted. Runs smooth as silk.', 1),
('RX-7 Spirit R', 2002, 88000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mazda_RX7_at_British_International_Motor_Show_2006.jpg/800px-Mazda_RX7_at_British_International_Motor_Show_2006.jpg', 45000, 'Easily the most collectible of all the RX-7s, the Spirit R combines all the features Mazda used on all previous limited-run specials but with the addition of cross-drilled brake rotors.', 2),
('S2000 AP2', 2006, 52000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/HondaS2000-007.jpg/800px-HondaS2000-007.jpg', 110492, 'Beautiful AP2 model, recently replaced soft top, revs out to redline at 9000rpm with ease, awesome bolt-action-like gear shifts due to short link to transmission and trans tunnel running close to shifter. The S2K used to hold a world record for the most power produced from a naturally-aspirated 4 cylinder engine until later beaten by Porsche', 3),
('BRZ', 2016, 27000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Subaru_BRZ_1998cc_October_2013_%282%29.jpg/1024px-Subaru_BRZ_1998cc_October_2013_%282%29.jpg', 13450, 'Low kilometres, striking blue colour paintwork that has been well maintained. A lot of fun around the corners, quite a nice and agile car with low centre of gravity due to the boxer engine mounted low within the chassis', 4),
('RX-8', 2010, 23220, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/2008-2010_Mazda_RX-8_%28FE_Series_2%29_coupe_%282010-12-28%29.jpg/1920px-2008-2010_Mazda_RX-8_%28FE_Series_2%29_coupe_%282010-12-28%29.jpg', 81352, 'Recently renewed registration February 8th 2025. Single-owner with complete service records', 2),
('Skyline R34 GT-R', 2000, 152000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg/1024px-Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg', 53200, 'M-Spec Nur in Millenium Jade. Only 253 ever made, comes with 300km/h speedometer, N1 motor.', 1),
('NSX', 1998, 110231, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Honda_NSX_reg_1991_2977_cc.JPG/1280px-Honda_NSX_reg_1991_2977_cc.JPG', 79200, '3.0L V6 mid-engine with VTEC. Rear-wheel drive. Styling was inspired by the F-16 fighter jet cockpit.', 3);
`;

async function main() {
  console.log("seeding");

  const database = process.argv[2];

  if (database === "local") {
    const client = new Client({
      connectionString: process.env.LOCAL_DB,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
  }

  if (database === "production") {
    const client = new Client({
      connectionString: process.env.DATABASE_PUBLIC_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
  }

  console.log("done");
}

main();
