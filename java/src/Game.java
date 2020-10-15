import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Game {
    private Board b;
    private String playerSymbol;

    private int[][] winArray= {
            {0,1,2},
            {3,4,5},
            {6,7,8},
            {0,3,6},
            {1,4,7},
            {2,5,8},
            {0,4,8},
            {2,4,6}
    };

    public Game() {
        b = new Board();
        playerSymbol = "X";
        while(!checkWin()){
            playerMove(playerSymbol);
            displayBoard();
        }
    }

    private boolean checkWin(){
        ArrayList<Square> t = b.getSquares();
        for(int[] a:winArray){
            if(t.get(a[0]).getSymbol().equalsIgnoreCase(t.get(a[1]).getSymbol()) &&
            t.get(a[0]).getSymbol().equalsIgnoreCase(t.get(a[2]).getSymbol()) &&
            !t.get(a[0]).getSymbol().equalsIgnoreCase("")){
                b.getSquares().get(a[0]).setBgColor(Color.YELLOW);
                b.getSquares().get(a[1]).setBgColor(Color.YELLOW);
                b.getSquares().get(a[2]).setBgColor(Color.YELLOW);
                return true;
            }
        }
        return false;
    }

    private void playerMove(String s){
        //Do button on click to square if no symbol
        Scanner scan = new Scanner(System.in);
        boolean help = false;

        while(!help){
            String input = scan.nextLine();
            String[] coordArray = input.split(",");
            // System.out.println("Do you want to play this move at " + Arrays.toString(coordArray) + " .");
            // while(s)
            ArrayList<Square> squaresList = b.getSquares();
            Square square = squaresList.get(Integer.parseInt(coordArray[0]) * 3 + Integer.parseInt(coordArray[1]));
            if(square.getSymbol().equals("")) {
                square.setSymbol(s);
                help = true;
            }
            else {
                System.out.println("Input new coordinates");
            }
        }

        //Then change player whose turn it is
        playerSymbol = playerSymbol.equals("X") ? "O" : "X";

    }

    private void displayBoard() {
        ArrayList<Square> squaresList = b.getSquares();
        System.out.println("| " + squaresList.get(0).getSymbol() + " | " + squaresList.get(1).getSymbol() + " | " + squaresList.get(2).getSymbol() + " |");
        System.out.println("------------");
        System.out.println("| " + squaresList.get(3).getSymbol() + " | " + squaresList.get(4).getSymbol() + " | " + squaresList.get(5).getSymbol() + " |");
        System.out.println("------------");
        System.out.println("| " + squaresList.get(6).getSymbol() + " | " + squaresList.get(7).getSymbol() + " | " + squaresList.get(8).getSymbol() + " |");
        System.out.println("------------");
    }

    public static void main(String[] args) {
        Game g = new Game();
    }
}
